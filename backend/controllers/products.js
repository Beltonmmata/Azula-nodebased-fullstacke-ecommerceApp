const Product = require("../models/product");
const { cloudinary } = require("../config/multerConfig");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require("../errors");
const validateObjectId = require("../utils/validateObjectId");
const getAllProducts = async (req, res) => {
  const { featured, category, limit, page, sort, search } = req.query;
  let queryStrings = {};
  if (featured) {
    queryStrings.featured = featured === "true";
  }
  if (category && category !== "all") {
    queryStrings.category = category;
  }
  if (search) {
    searchRegex = { $regex: search.replace(/\+/g, " "), $options: "i" };

    queryStrings.$or = [
      { name: searchRegex },
      { description: searchRegex },
      { brand: searchRegex },
      { keywords: searchRegex },
    ];
  }
  //console.log("Query Filters:", queryStrings); //debagger

  let results = Product.find(queryStrings);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    results = results.sort(sortList);
  } else {
    results = results.sort("createdAt");
  }

  let limitValue = Number(limit) || 6;
  let pageValue = Number(page) || 1;

  let skip = (pageValue - 1) * limitValue;

  results = results.skip(skip).limit(limitValue);
  const products = await results
    .populate("reviews") // gets reviews from Review model
    .populate("likes"); // gets likes from Like model
  if (!products.length) {
    throw new NotFoundError("Products not found");
  }
  res.status(200).json({ products });
};

const getProduct = async (req, res) => {
  validateObjectId(req.params.id, "product");
  const id = req.params.id;
  const product = await Product.findById(id)
    .populate("reviews") // gets reviews from Review model
    .populate("likes"); // gets likes from Like model
  if (!product) {
    throw new NotFoundError(`Product  with id ${id}  not found`);
  }
  res.status(200).json({ product });
};
const createProduct = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("You're not authenticated");
  }
  if (!req.user.isAdmin) {
    throw new UnauthorizedError("Route protected to admins only");
  }

  const {
    name,
    priceWas,
    priceIs,
    featured,
    keywords,
    brand,
    description,
    category,
    avarageRating,
    count,
    countInStock,
  } = req.body;

  const keywordsArray = keywords
    ? keywords.split(",").map((keyword) => keyword.trim())
    : [];

  const imageUrl = req.file ? req.file.path : null;
  if (!imageUrl) throw new BadRequestError("Product image is required");

  // 🔍 Validate numeric fields
  if (isNaN(Number(priceIs)) || isNaN(Number(priceWas))) {
    throw new BadRequestError("Prices must be numbers");
  }
  if (isNaN(Number(count))) {
    throw new BadRequestError("Count must be a number");
  }
  if (isNaN(Number(avarageRating))) {
    throw new BadRequestError("Average rating must be a number");
  }
  if (isNaN(Number(countInStock))) {
    throw new BadRequestError("Count in stock must be a number");
  }

  const productData = {
    name,
    priceWas: Number(priceWas),
    priceIs: Number(priceIs),
    featured:
      req.body.featured !== undefined
        ? req.body.featured === "true"
        : undefined,
    keywords: keywordsArray,
    brand,
    description,
    category,
    countInStock: parseInt(countInStock, 10),
    rating: {
      avarageRating: avarageRating ? parseFloat(avarageRating) : 0,
      count: count ? parseInt(count) : 0,
    },
    reviews: [],
    imageUrl,
  };

  // 🔥 Remove undefined featured so Mongoose can use default
  if (productData.featured === undefined) {
    delete productData.featured;
  }

  const product = await Product.create(productData);
  console.log("✅ Product created:", product);

  res.status(201).json({ product });
};

const deleteProduct = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Your not authenticated");
  }
  if (!req.user.isAdmin) {
    throw new UnauthorizedError("Route protected to admins only");
  }
  validateObjectId(req.params.id, "product");
  const { id: productID } = req.params;

  const product = await Product.findById(productID);
  if (!product) {
    throw new NotFoundError(`Product  with id ${productID}  not found`);
  }

  const productImageUrl = product.imageUrl;
  const segments = productImageUrl.split("/");
  const publicIdWithExtension = segments.slice(-1)[0];
  const publicId = `Azula-app/products/${publicIdWithExtension.split(".")[0]}`;

  try {
    await cloudinary.uploader.destroy(publicId);
    console.console.log(`Image deleated successfully, publicId:${publicId}`);
  } catch (error) {
    console.error("image deletion failes", error);
  }
  await Product.findByIdAndDelete(productID);
  res.status(200).json({ message: "product deleated completly" });
};
const updateProduct = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Your not authenticated");
  }
  if (!req.user.isAdmin) {
    throw new UnauthorizedError("Route protected to admins only");
  }
  validateObjectId(req.params.id, "product");
  const { id: productID } = req.params;
  let updatingData = req.body;
  if (req.file) {
    updatingData.imageUrl = req.file.path; // If a new image is uploaded, update it
  }

  const product = await Product.findOneAndUpdate(
    { _id: productID },
    updatingData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new NotFoundError(`No product with id : ${productID}`);
  }

  res.status(200).json({ product });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
