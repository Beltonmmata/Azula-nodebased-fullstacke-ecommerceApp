const mongoose = require("mongoose");
// Product Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priceWas: { type: Number },
  priceIs: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false },
  keywords: [{ type: String }],
  brand: { type: String },
  description: { type: String, required: true },
  imageUrl: { type: String },
  category: {
    type: String,
    enum: {
      values: ["women", "men", "kids", "all"],
      message: "{VALUE} Is not provided",
    },
    required: true,
  },
  countInStock: { type: Number, required: true, default: 0 },
  rating: {
    avarageRating: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
});

productSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "productId",
});

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
});

productSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);
