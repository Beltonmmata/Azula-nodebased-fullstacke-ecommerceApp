// Product Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priceWas: { type: Number },
  priceIs: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  keywords: [{ type: String }],
  brand: { type: String },
  description: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: [
    {
      reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

// Reviews Model
const reviewSchema = new mongoose.Schema({
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = {
  Product: mongoose.model("Product", productSchema),
  Review: mongoose.model("Review", reviewSchema),
};
