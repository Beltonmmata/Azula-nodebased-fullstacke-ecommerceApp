require("dotenv").config();
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const Order = require("../models/order");
const Product = require("../models/product");
const DeliveryOption = require("../models/deliveryOption");
const User = require("../models/user");
const sendEmail = require("../utils/emailServices");
const generateOrderEmail = require("../utils/mailer/generateOrderConfirmation");
const validateObjectId = require("../utils/validateObjectId");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../errors");

const getAllOrders = async (req, res) => {
  let orders = [];
  if (req.user.isAdmin) {
    orders = await Order.find({}).sort({ createdAt: -1 });
  } else {
    orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Orders retrieved successfully",
    nbHits: orders.length,
    data: orders,
  });
};

const getOrder = async (req, res) => {
  validateObjectId(req.params.id, "order");
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new NotFoundError(`Order with id ${req.params.id} not found`);
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Order fetched successfully",
    data: order,
  });
};

const createOrder = async (req, res, next) => {
  try {
    if (!req.user) throw new UnauthenticatedError("User authentication failed");

    const { orderItems, deliveryOption, shipping, paymentMethod, promoCode } =
      req.body;

    if (!orderItems || orderItems.length === 0) {
      throw new BadRequestError("No order items provided");
    }

    const delivery = await DeliveryOption.findById(deliveryOption);
    if (!delivery) throw new BadRequestError("Invalid delivery option");

    let productTotal = 0;
    for (const item of orderItems) {
      const product = await Product.findById(item.productId);
      if (!product)
        throw new NotFoundError(`Product ${item.productId} not found`);
      if (product.countInStock < item.quantity) {
        throw new BadRequestError(
          `Not enough stock for ${product.name}. Only ${product.countInStock} left`
        );
      }
      item.priceAtOrder = product.priceIs;
      productTotal += product.priceIs * item.quantity;
    }

    let discount = 0;
    let referrer = null;
    if (promoCode) {
      referrer = await User.findOne({ promoCode });
      if (!referrer) throw new BadRequestError("Invalid promo code");
      discount = productTotal * 0.1;
    }

    const tax = (productTotal - discount) * 0.1;
    const shippingPrice = delivery.deliveryPrice;
    const totalPrice = productTotal - discount + tax + shippingPrice;

    const orderStatus =
      paymentMethod === "Pay On Delivery" ? "created" : "Pending";

    const order = await Order.create({
      userId: req.user.id,
      orderItems,
      deliveryOption,
      shipping,
      paymentMethod,
      shippingPrice,
      totalPrice,
      orderStatus,
    });

    for (const item of orderItems) {
      const product = await Product.findById(item.productId);
      product.countInStock = Math.max(product.countInStock - item.quantity, 0);
      await product.save();
    }

    if (referrer) {
      referrer.referredOrders = referrer.referredOrders || [];
      referrer.referredOrders.push(order._id);
      await referrer.save();
    }

    const user = req.user;
    const emailSubject = "Order Confirmation";
    const emailText =
      order.paymentMethod === "Pay On Delivery"
        ? `Dear ${user.name},\n\nThank you for your order!\nOrder ID: ${order._id}\nTotal: Ksh.${order.totalPrice}\n\nYour order is being processed.`
        : `Dear ${user.name},\n\nThank you for your order!\nOrder ID: ${order._id}\nTotal: Ksh.${order.totalPrice}\n\nYour order is pending until payment is confirmed.`;

    const orderHtml = generateOrderEmail(order, user, emailText);
    await sendEmail({
      to: user.email,
      subject: emailSubject,
      text: emailText,
      html: orderHtml,
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    next(error);
  }
};

const deleteOrder = async (req, res) => {
  validateObjectId(req.params.id, "order");
  const order = await Order.findOneAndDelete({ _id: req.params.id });
  if (!order)
    throw new NotFoundError(`Order with id ${req.params.id} not found`);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Order deleted successfully",
    data: order,
  });
};

const updateOrder = async (req, res) => {
  validateObjectId(req.params.id, "order");
  const order = await Order.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!order) throw new NotFoundError(`No order with id: ${req.params.id}`);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Order updated successfully",
    data: order,
  });
};

const updateOrderStatus = async (req, res) => {
  validateObjectId(req.params.id, "order");
  const { orderStatus } = req.body;
  if (
    ![
      "Pending",
      "created",
      "Processing",
      "Shipped",
      "Delivered",
      "Completed",
      "Cancelled",
    ].includes(orderStatus)
  ) {
    throw new BadRequestError("Invalid order status");
  }
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus },
    { new: true, runValidators: true }
  );
  if (!order)
    throw new NotFoundError(`No order found with id ${req.params.id}`);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
};

const cancelOrder = async (req, res) => {
  validateObjectId(req.params.id, "order");
  const order = await Order.findById(req.params.id);
  if (!order) throw new NotFoundError("Order not found");
  if (order.userId.toString() !== req.user.id && !req.user.isAdmin) {
    throw new UnauthorizedError("Not allowed to cancel this order");
  }
  if (
    ["Shipped", "Delivered"].includes(order.orderStatus) ||
    order.isCancelled
  ) {
    throw new BadRequestError("This order cannot be cancelled");
  }
  order.isCancelled = true;
  order.orderStatus = "Cancelled";
  order.cancelledAt = new Date();
  await order.save();
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Order cancelled successfully",
    data: order,
  });
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  cancelOrder,
};
