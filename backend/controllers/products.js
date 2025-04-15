const Product = require("../models/product");
const { cloudinary } = require("../config/multerConfig");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const validateObjectId = require("../utils/validateObjectId");

const getAllProducts = async (req, res) => {
  const { featured, category, limit, page, sort, search } = req.query;
  let queryStrings = {};

  if (featured) queryStrings.featured = featured === "true";
  if (category && category !== "all") queryStrings.category = category;
  if (search) {
    const searchRegex = { $regex: search.replace(/\+/g, " "), $options: "i" };
    queryStrings.$or = [
      { name: searchRegex },
      { description: searchRegex },
      { brand: searchRegex },
      { keywords: searchRegex },
    ];
  }

  let results = Product.find(queryStrings);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    results = results.sort(sortList);
  } else {
    results = results.sort("createdAt");
  }

  const limitValue = Number(limit) || 6;
  const pageValue = Number(page) || 1;
  const skip = (pageValue - 1) * limitValue;

  results = results.skip(skip).limit(limitValue);

  const products = await results.populate("reviews").populate("likes");
  if (!products.length) {
    throw new NotFoundError("Products not found");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Products retrieved successfully",
    nbHits: products.length,
    data: products,
  });
};

const getProduct = async (req, res) => {
  validateObjectId(req.params.id, "product");
  const product = await Product.findById(req.params.id)
    .populate("reviews")
    .populate("likes");
  if (!product) {
    throw new NotFoundError(`Product with id ${req.params.id} not found`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product retrieved successfully",
    data: product,
  });
};

const createProduct = async (req, res) => {
  if (!req.user) throw new UnauthenticatedError("You're not authenticated");
  if (!req.user.isAdmin) throw new UnauthorizedError("Admin access only");

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
    ? keywords.split(",").map((k) => k.trim())
    : [];

  const imageUrl = req.file ? req.file.path : null;
  if (!imageUrl) throw new BadRequestError("Product image is required");

  if (
    isNaN(Number(priceIs)) ||
    isNaN(Number(priceWas)) ||
    isNaN(Number(count)) ||
    isNaN(Number(avarageRating)) ||
    isNaN(Number(countInStock))
  ) {
    throw new BadRequestError("Invalid number format in one or more fields");
  }

  const productData = {
    name,
    priceWas: Number(priceWas),
    priceIs: Number(priceIs),
    featured: req.body.featured === "true",
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

  const product = await Product.create(productData);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

const deleteProduct = async (req, res) => {
  if (!req.user) throw new UnauthenticatedError("You're not authenticated");
  if (!req.user.isAdmin) throw new UnauthorizedError("Admin access only");

  validateObjectId(req.params.id, "product");
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new NotFoundError(`Product with id ${req.params.id} not found`);
  }

  const segments = product.imageUrl.split("/");
  const publicId = `Azula-app/products/${segments.slice(-1)[0].split(".")[0]}`;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary image deletion failed", error);
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product deleted successfully",
    data: product,
  });
};

const updateProduct = async (req, res) => {
  if (!req.user) throw new UnauthenticatedError("You're not authenticated");
  if (!req.user.isAdmin) throw new UnauthorizedError("Admin access only");

  validateObjectId(req.params.id, "product");
  const updateData = req.body;
  if (req.file) {
    updateData.imageUrl = req.file.path;
  }

  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    updateData,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new NotFoundError(`No product with id: ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
