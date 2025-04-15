require("dotenv").config();
const mongoose = require("mongoose");
const Reviews = require("../models/reviews");
const Order = require("../models/order");
const { StatusCodes } = require("http-status-codes");

const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../errors");

const validateObjectId = require("../utils/validateObjectId");

// Create Reviews (must have purchased the product — assume check already done)
const createReview = async (req, res) => {
  if (!req.user._id)
    throw new UnauthenticatedError("You are not authenticated");

  const { productId, rating, comment } = req.body;
  const reviewerId = req.user._id;

  const hasPurchased = await Order.exists({
    userId: reviewerId,
    "orderItems.productId": productId,
    orderStatus: "Completed",
  });

  if (!hasPurchased) {
    throw new BadRequestError(
      "You must purchase the product before reviewing."
    );
  }

  const review = await Reviews.create({
    reviewerId,
    productId,
    rating,
    comment,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Review created successfully",
    data: review,
  });
};

// 🧼 Update Review
const updateReview = async (req, res) => {
  validateObjectId(req.params.id, "review");

  const reviewerId = req.user._id;
  const reviewId = req.params.id;
  const { rating, comment } = req.body;

  const review = await Reviews.findOneAndUpdate(
    { _id: reviewId, reviewerId },
    { rating, comment },
    { new: true, runValidators: true }
  );

  if (!review) {
    throw new NotFoundError("Review not found or not authorized to update");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Review updated successfully",
    data: review,
  });
};

// 🧼 Delete Review
const deleteReview = async (req, res) => {
  validateObjectId(req.params.id, "review");

  const reviewerId = req.user._id;
  const reviewId = req.params.id;

  const review = await Reviews.findOneAndDelete({ _id: reviewId, reviewerId });

  if (!review) {
    throw new NotFoundError("Review not found or not authorized to delete");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Review deleted successfully",
    data: {},
  });
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
