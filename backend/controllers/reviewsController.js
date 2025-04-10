require("dotenv").config();
const mongoose = require("mongoose");
const Reviews = require("../models/reviews");
const Order = require("../models/order");

const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../errors");

const validateObjectId = require("../utils/validateObjectId");

// 2️⃣ ----------------- Reviews Controllers ------------------

// Create Reviews (must have purchased the product — assume check already done)
const createReview = async (req, res) => {
  if (!req.user._id) {
    throw new UnauthenticatedError("You are not authenticated");
  }
  const { productId, rating, comment } = req.body;

  const reviewerId = req.user._id;

  const hasPurchased = await Order.exists({
    userId,
    "products.productId": productId,
    status: "completed",
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

  // Optionally update product rating info here...

  res.status(201).json({ message: "Reviews created", review });
};

// Update Reviews
const updateReview = async (req, res) => {
  validateObjectId(req.params.id, "reviewer");

  if (!req.user._id) {
    throw new UnauthenticatedError("You are not authenticated");
  }
  const { rating, comment } = req.body;
  const { reviewId } = req.params;

  const review = await Reviews.findOneAndUpdate(
    { _id: reviewId, reviewerId: req.user._id },
    { rating, comment },
    { new: true }
  );

  res.status(200).json({ message: "Reviews updated", review });
};

// Delete Reviews
const deleteReview = async (req, res) => {
  validateObjectId(req.params.id, "reviewer");
  if (!req.user._id) {
    throw new UnauthenticatedError("You are not authenticated");
  }
  const { reviewId } = req.params;
  await Reviews.findOneAndDelete({ _id: reviewId, reviewerId: req.user._id });
  res.status(200).json({ message: "Reviews deleted" });
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
