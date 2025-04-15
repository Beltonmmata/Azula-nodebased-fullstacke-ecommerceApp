const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/user");
const {
  UnauthenticatedError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../errors");
const validateObjectId = require("../utils/validateObjectId");

const getAllUsers = async (req, res) => {
  const users = await User.find({})
    .select("-password")
    .populate({
      path: "wishlist",
      populate: { path: "productId", model: "Product" },
    });

  if (users.length === 0) {
    throw new NotFoundError("No users found");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Users retrieved successfully",
    nbHits: users.length,
    data: users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      wishlist: user.wishlist.map((like) => like.productId),
      createdAt: user.createdAt,
    })),
  });
};

const getUser = async (req, res) => {
  if (!req.user) throw new UnauthenticatedError("You're not authenticated");

  const id = req.params.id;
  const user = await User.findById(id).populate({
    path: "wishlist",
    populate: { path: "productId", model: "Product" },
  });

  if (!user)
    throw new CustomError.NotFoundError(`User with id ${id} not found`);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "User retrieved successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      wishlist: user.wishlist.map((like) => like.productId),
      createdAt: user.createdAt,
    },
  });
};

const deleteUser = async (req, res) => {
  if (!req.user) throw new UnauthenticatedError("You're not authenticated");
  if (!req.user.isAdmin) throw new UnauthorizedError("Admin access only");

  const id = req.params.id;
  const user = await User.findOneAndDelete({ _id: id });

  if (!user)
    throw new CustomError.NotFoundError(`User with id ${id} not found`);

  res.status(StatusCodes.OK).json({
    success: true,
    message: `User ${id} deleted successfully`,
    data: {},
  });
};

const updateUser = async (req, res) => {
  const { id: userID } = req.params;

  const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new NotFoundError(`No user with id: ${userID}`);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
};

const deleteMyAccount = async (req, res) => {
  const userId = req.user._id;
  validateObjectId(userId, "user");

  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new NotFoundError("User not found or already deleted");

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Your account has been deleted",
    data: {},
  });
};

const updateMyAccount = async (req, res) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  const invalidFields = Object.keys(req.body).filter(
    (key) => !["name", "email"].includes(key)
  );
  if (invalidFields.length > 0) {
    throw new BadRequestError(
      `You can't update: ${invalidFields.join(", ")}. Contact admin.`
    );
  }

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("User not found");

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Account updated successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      promoCode: user.promoCode,
      createdAt: user.createdAt,
    },
  });
};

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  updateMyAccount,
  deleteMyAccount,
};
