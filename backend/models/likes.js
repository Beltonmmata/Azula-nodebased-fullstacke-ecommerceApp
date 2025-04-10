const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

likeSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("Like", likeSchema);
