const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

reviewSchema.index({ reviewerId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
