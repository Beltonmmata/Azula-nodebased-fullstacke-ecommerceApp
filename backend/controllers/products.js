const products = require("../models/products");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await products.find({});
  if (!products) {
    return next(createCustomError(`No products in the database`, 404));
  }
  res.status(200).json({ products });
});

const createProduct = asyncWrapper(async (req, res) => {
  const product = await products.create(req.body);
  res.status(201).json({ product });
});

const getProduct = asyncWrapper(async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await products.findOne({ _id: productID });
  if (!product) {
    return next(createCustomError(`No product with id : ${productID}`, 404));
  }

  res.status(200).json({ product });
});
const deleteProduct = asyncWrapper(async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Products.findOneAndDelete({ _id: productID });
  if (!product) {
    return next(createCustomError(`No product with id : ${productID}`, 404));
  }
  res.status(200).json({ product });
});
const updateProduct = asyncWrapper(async (req, res, next) => {
  const { id: productID } = req.params;

  const product = await Products.findOneAndUpdate(
    { _id: productID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    return next(createCustomError(`No product with id : ${productID}`, 404));
  }

  res.status(200).json({ product });
});

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
