require("dotenv").config();
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
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
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Delivery options retrieved successfully",
    nbHits: deliveryOptions.length,
    data: deliveryOptions,
  });
};

const createDeliveryOption = async (req, res) => {
  if (!req.user) throw new UnauthenticatedError("You're not authenticated");
  if (!req.user.isAdmin)
    throw new UnauthorizedError("Route protected to admins only");

  const { deliveryName, deliveryPrice, deliveryDays } = req.body;
  const deliveryOption = await DeliveryOption.create({
    deliveryName,
    deliveryPrice,
    deliveryDays,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Delivery option created successfully",
    data: deliveryOption,
  });
};

const getDeliveryOption = async (req, res) => {
  validateObjectId(req.params.id, "deliveryOption");
  const id = req.params.id;
  const deliveryOption = await DeliveryOption.findById(id);
  if (!deliveryOption)
    throw new NotFoundError(`Delivery Option with id:${id} not found`);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Delivery option retrieved successfully",
    data: deliveryOption,
  });
};

const updateDeliveryOption = async (req, res) => {
  if (!req.user) throw new UnauthenticatedError("You're not authenticated");
  if (!req.user.isAdmin)
    throw new UnauthorizedError("Route protected to admins only");

  validateObjectId(req.params.id, "deliveryOption");
  const { id: deliveryOptionID } = req.params;

  const deliveryOption = await DeliveryOption.findOneAndUpdate(
    { _id: deliveryOptionID },
    req.body,
    { new: true, runValidators: true }
  );

  if (!deliveryOption)
    throw new NotFoundError(`No delivery option with id: ${deliveryOptionID}`);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Delivery option updated successfully",
    data: deliveryOption,
  });
};

const deleteDeliveryOption = async (req, res) => {
  if (!req.user) throw new UnauthenticatedError("You're not authenticated");
  if (!req.user.isAdmin)
    throw new UnauthorizedError("Route protected to admins only");

  validateObjectId(req.params.id, "deliveryOption");
  const id = req.params.id;
  const deliveryOption = await DeliveryOption.findOneAndDelete({ _id: id });

  if (!deliveryOption)
    throw new NotFoundError(`No delivery option with id: ${id}`);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Delivery option deleted successfully",
    data: deliveryOption,
  });
};

module.exports = {
  getAllDeliveryOptions,
  createDeliveryOption,
  getDeliveryOption,
  updateDeliveryOption,
  deleteDeliveryOption,
};
