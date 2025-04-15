require("dotenv").config();
const mongoose = require("mongoose");
const Likes = require("../models/likes");
const { StatusCodes } = require("http-status-codes");

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
    throw new UnauthenticatedError("You're not authenticated");
  }
  const userId = req.user._id;
  const { productId } = req.params;

  const like = await Likes.create({ userId, productId });
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product liked successfully",
    data: like,
  });
};

// Remove Like
const unlikeProduct = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  await Likes.findOneAndDelete({ userId, productId });
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product unliked successfully",
    data: {},
  });
};

module.exports = {
  unlikeProduct,
  likeProduct,
};
