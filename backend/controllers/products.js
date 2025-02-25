const Product = require("../models/product");

const { createCustomError } = require("../errors/custom-error");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    return next(createCustomError(`No products in the database`, 404));
  }
  res.status(200).json({ products });
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const getProduct = async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await products.findOne({ _id: productID });
  if (!product) {
    return next(createCustomError(`No product with id : ${productID}`, 404));
  }

  res.status(200).json({ product });
};
const deleteProduct = async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Products.findOneAndDelete({ _id: productID });
  if (!product) {
    return next(createCustomError(`No product with id : ${productID}`, 404));
  }
  res.status(200).json({ product });
};
const updateProduct = async (req, res, next) => {
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
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
