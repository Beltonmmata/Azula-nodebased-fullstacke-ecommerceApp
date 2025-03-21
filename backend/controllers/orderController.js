const mongoose = require("mongoose");
const Order = require("../models/order");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../errors");

const { sendEmail } = require("../utils/emailServices");
const getAllOrders = async (req, res) => {
  let orders;
  if (req.user.isAdmin) {
    orders = await Order.find({}).sort({ createdAt: -1 });
  } else {
    orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
  }

  if (orders.length === 0) {
    throw new NotFoundError("No orders found");
  }
  res.status(200).json({ orders });
};

const getOrder = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Invalid order ID: ${id}`);
  }
  const order = await Order.findById(id);
  if (!order) {
    throw new NotFoundError(`Order  with id ${id}  not found`);
  }
  res.status(200).json({ order });
};
const createOrder = async (req, res, next) => {
  try {
    console.log("User in createOrder:", req.user);

    if (!req.user) {
      throw new UnauthenticatedError("User authentication failed");
    }

    const {
      orderItems,
      deliveryOption,
      shipping,
      payment,
      totalPrice,
      shippingPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      throw new BadRequestError("No order items provided");
    }

    if (!totalPrice || !shippingPrice) {
      throw new BadRequestError("Total price and shipping price are required");
    }

    const selectedPaymentMethod = payment?.paymentMethod || "Pay on Delivery";

    const order = await Order.create({
      userId: req.user.id,
      orderItems,
      deliveryOption,
      shipping,
      payment: {
        paymentMethod: selectedPaymentMethod,
      },
      totalPrice,
      shippingPrice,
      isPaid: selectedPaymentMethod === "Pay on Delivery" ? false : false,
    });

    console.log("Created Order:", order);

    // Send Email (Wrap in Try-Catch)
    try {
      const emailSubject = "Order Confirmation";
      const emailText = `Dear ${req.user.name},\n\nThank you for your order!\nOrder ID: ${order._id}\nTotal: $${order.totalPrice}\n\nWe will notify you when your order is shipped.`;

      const emailHtml = `
        <h2>Order Confirmation</h2>
        <p>Dear ${req.user.name},</p>
        <p>Thank you for your order!</p>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Total:</strong> $${order.totalPrice}</p>
        <p>We will notify you when your order is shipped.</p>
      `;

      await sendEmail({
        to: req.user.email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    res.status(201).json({ order });
  } catch (error) {
    console.error("Error in createOrder:", error);
    next(error); // Pass error to middleware
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Invalid order ID: ${id}`);
  }
  const order = await Order.findOneAndDelete({ _id: id });
  if (!order) {
    throw new NotFoundError(`order  with id ${id}  not found`);
  }
  res.status(200).json({ message: `order deleted successfully`, order });
};
const updateOrder = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Invalid order ID: ${id}`);
  }

  const order = await Order.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    throw new NotFoundError(`No order with id : ${id}`);
  }

  res.status(200).json({ order });
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
