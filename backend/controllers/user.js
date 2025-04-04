const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/user");
const {
  UnauthenticatedError,
  NotFoundError,

  UnauthorizedError,
} = require("../errors");
const getAllUsers = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Your not authenticated");
  }
  if (!req.user.isAdmin) {
    throw new UnauthorizedError("Route protected to admins only");
  }
  const users = await User.find({}).select("-password"); // Exclude password field

  if (user.length === 0) {
    throw new NotFoundError("No users found");
  }
  res.status(200).json({
    users: users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    })),
  });
};

const getUser = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Your not authenticated");
  }

  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    throw new CustomError.NotFoundError(`user with id ${id}  not found`);
  }
  res.status(StatusCodes.OK).json({
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  });
};
const deleteUser = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Your not authenticated");
  }
  if (!req.user.isAdmin) {
    throw new UnauthorizedError("Route protected to admins only");
  }
  const id = req.params.id;
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    throw new CustomError.NotFoundError(`user with id ${id}  not found`);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: `user ${id} delete successfully` });
};
const updateUser = async (req, res) => {
  if (!req.user) {
    throw new UnauthenticatedError("Your not authenticated");
  }
  if (!req.user.isAdmin) {
    throw new UnauthorizedError("Route protected to admins only");
  }
  const { id: userID } = req.params;

  const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new NotFoundError(`No user with id : ${userID}`);
  }

  res.status(200).json({ user });
};

module.exports = { getAllUsers, getUser, deleteUser, updateUser };
