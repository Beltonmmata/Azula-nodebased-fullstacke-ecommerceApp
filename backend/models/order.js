const mongoose = require("mongoose");
// Order Model
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    deliveryOption: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryOption",
      required: true,
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
    paymentMethod: {
      type: String,
      enum: ["Pay On Delivery", "Pay On Order"],
      default: "Pay On Order",
    },
    paymentResults: {
      checkoutRequestID: String,
      mpesaReceiptNumber: String,
      phoneNumber: String,
      amount: Number,
      resultCode: Number,
      resultDesc: String,
      paidAt: Date,
      failedAt: Date,
    },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    shippingPrice: { type: Number, required: true },
    deliveredAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "created",
        "Processing",
        "Shipped",
        "Delivered",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
    isCancelled: { type: Boolean, default: false },
    cancelledAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
