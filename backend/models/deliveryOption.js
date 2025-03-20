const mongoose = require("mongose");
// Delivery Options Model
const deliveryOptionSchema = new mongoose.Schema({
  deliveryName: {
    type: String,
    enum: ["express", "common", "free"],
    required: true,
  },
  deliveryPrice: { type: Number, required: true },
  deliveryDays: { type: Number, required: true },
});
module.exports = mongoose.model("DeliveryOption", deliveryOptionSchema);
