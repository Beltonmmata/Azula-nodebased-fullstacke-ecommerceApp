// Delivery Options Model
const deliveryOptionSchema = new mongoose.Schema({
  deliveryName: {
    type: String,
    enum: ["fast", "moderate", "slower"],
    required: true,
  },
  deliveryPrice: { type: Number, required: true },
  deliveryDays: { type: Number, required: true },
});

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
  deliveryOption: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryOption",
    required: true,
  },
  shipping: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    yourPlaceDescription: { type: String },
  },
  payment: {
    paymentMethod: { type: String, required: true },
    paymentResults: {
      orderId: { type: String },
      payerId: { type: String },
      paymentId: { type: String },
      paymentAt: { type: Date },
    },
  },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
  deliveryOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryOption",
  },
  shippingPrice: { type: Number, required: true },
  deliveredAt: { type: Date },
});

module.exports = {
  DeliveryOption: mongoose.model("DeliveryOption", deliveryOptionSchema),
  Order: mongoose.model("Order", orderSchema),
};
