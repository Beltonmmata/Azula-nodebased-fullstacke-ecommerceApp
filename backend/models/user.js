const mongoose = require("mongoose");

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: { type: String, required: true },
  resetOtp: { type: String },
  resetOtpExpiry: { type: Date },
  isAdmin: { type: Boolean, default: false },
  promoCode: { type: String, unique: true },
  referredOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  role: {
    type: String,
    enums: ["user", "admin", "superAdmin"],
    default: "user",
  },
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
