const Product = require("../models/product");

// const { createCustomError } = require("../errors/custom-error");

const getAllProducts = async (req, res) => {
  const product = await Product.find({});
  if (!product) {
    throw Error("Product not found");
  }
  res.status(200).json({ product });
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    throw Error(`Product  with id ${id}  not found`);
  }
  res.status(200).json({ product });
};
const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOneAndDelete({ _id: productID });
  if (!product) {
    throw Error(`Product  with id ${id}  not found`);
  }
  res.status(200).json({ product });
};
const updateProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw Error(`No product with id : ${productID}`, 404);
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
