const mongoose = require("mongoose");
// Delivery Options Model
const deliveryOptionSchema = new mongoose.Schema(
  {
    deliveryName: { type: String, required: true },
    deliveryPrice: { type: Number, required: true },
    deliveryDays: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("DeliveryOption", deliveryOptionSchema);
