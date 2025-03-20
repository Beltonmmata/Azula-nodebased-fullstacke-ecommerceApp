const mongoose = require("mongoose");
// Order Model
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      priceAtOrder: { type: Number, required: true },
      dateAdded: { type: Date, default: Date.now },
    },
  ],
  //deliveryOption: {
  //  type: mongoose.Schema.Types.ObjectId,
  //  ref: "DeliveryOption",
  //  required: true,
  // },
  deliveryOption: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    durationInDays: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  shipping: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalAddress: { type: String, required: true },
    zipCode: { type: String, required: true },
    houseAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    yourPlaceDescription: { type: String },
  },
  payment: {
    paymentMethod: { type: String, default: "Pay on Delivery", required: true },
    paymentResults: {
      orderId: { type: String },
      payerId: { type: String },
      paymentId: { type: String },
      paymentAt: { type: Date },
      paymentReference: { type: String },
    },
  },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
  shippingPrice: { type: Number, required: true },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  isCancelled: { type: Boolean, default: false },
  cancelledAt: { type: Date },
});

module.exports = mongoose.model("Order", orderSchema);
