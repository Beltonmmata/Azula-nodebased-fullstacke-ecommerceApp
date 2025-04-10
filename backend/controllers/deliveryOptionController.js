require("dotenv").config();
const mongoose = require("mongoose");
const DeliveryOption = require("../models/deliveryOption");

const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../errors");

const validateObjectId = require("../utils/validateObjectId");

const getAllDeliveryOptions = async (req, res) => {
  const deliveryOptions = await DeliveryOption.find({});
  if (!deliveryOptions) throw new NotFoundError("No delivery option found");
  res.status(200).json({ deliveryOptions });
};
const createDeliveryOption = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("You're not authenticated");
  }
  if (!req.user.isAdmin) {
    throw new UnauthorizedError("Route protected to admins only");
  }
  const deliveryOption = req.body;
  await DeliveryOption.create({ deliveryOption });
  res.status(201).json({ deliveryOption });
};
const getDeliveryOption = async (req, res) => {
  validateObjectId(req.params.id, "deliveryOption");

  res.status(200).send("route working well");
};
const updateDeliveryOption = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("You're not authenticated");
  }
  if (!req.user.isAdmin) {
    throw new UnauthorizedError("Route protected to admins only");
  }
  validateObjectId(req.params.id, "deliveryOption");
  res.status(200).send("route working well");
};
const deleteDeliveryOption = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("You're not authenticated");
  }
  if (!req.user.isAdmin) {
    throw new UnauthorizedError("Route protected to admins only");
  }
  validateObjectId(req.params.id, "deliveryOption");
  res.status(200).send("route working well");
};
module.exports = {
  getAllDeliveryOptions,
  createDeliveryOption,
  getDeliveryOption,
  updateDeliveryOption,
  deleteDeliveryOption,
};
