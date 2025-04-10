const mongoose = require("mongoose");

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetOtp: { type: String },
  resetOtpExpiry: { type: Date },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// 💖 Virtual for wishlist (liked products)
userSchema.virtual("wishlist", {
  ref: "Like",
  localField: "_id", // User._id
  foreignField: "userId", // Like.userId
  justOne: false,
});

// 🧠 Ensure virtuals are included in toJSON and toObject
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
