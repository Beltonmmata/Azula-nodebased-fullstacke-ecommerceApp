const Product = require("../models/product");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} = require("../errors");
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
  console.log("Query Filters:", queryStrings); //debagger

  let results = Product.find(queryStrings);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    results = results.sort(sortList);
  } else {
    results = results.sort("createdAt");
  }

  let limitValue = Number(limit) || 5;
  let pageValue = Number(page) || 1;

  let skip = (pageValue - 1) * limitValue;

  results = results.skip(skip).limit(limitValue);
  const products = await results;

  if (!products.length) {
    throw new NotFoundError("Products not found");
  }
  res.status(200).json({ products });
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    throw new NotFoundError(`Product  with id ${id}  not found`);
  }
  res.status(200).json({ product });
};
const createProduct = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Your not authenticated");
  }
  if (!req.user.isAdmin) {
    throw new UnauthorizedError("Route protected to admins only");
  }
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const deleteProduct = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Your not authenticated");
  }
  if (!req.user.isAdmin) {
    throw new UnauthorizedError("Route protected to admins only");
  }
  const { id: productID } = req.params;
  const product = await Product.findOneAndDelete({ _id: productID });
  if (!product) {
    throw new NotFoundError(`Product  with id ${id}  not found`);
  }
  res.status(200).json({ product });
};
const updateProduct = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Your not authenticated");
  }
  if (!req.user.isAdmin) {
    throw new UnauthorizedError("Route protected to admins only");
  }
  const { id: productID } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });

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
