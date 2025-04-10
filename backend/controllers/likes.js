require("dotenv").config();
const mongoose = require("mongoose");
const Likes = require("../models/likes");

const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../errors");

const validateObjectId = require("../utils/validateObjectId");

// 1️⃣ ----------------- Likes Controllers ------------------

// Create Like
const likeProduct = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Your not authenticated");
  }
  const userId = req.user._id;
  const { productId } = req.body;

  const like = await Likes.create({ userId, productId });
  res.status(201).json({ message: "Product liked", like });
};

// Remove Like
const unlikeProduct = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  await Likes.findOneAndDelete({ userId, productId });
  res.status(200).json({ message: "Product unliked" });
};

module.exports = {
  unlikeProduct,
  likeProduct,
};
