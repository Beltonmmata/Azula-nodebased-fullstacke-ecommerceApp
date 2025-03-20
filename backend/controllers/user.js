const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/user");
const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password"); // Exclude password field

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
  const id = req.params.id;
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    throw new CustomError.NotFoundError(`user with id ${id}  not found`);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: `user ${id} delete successfully` });
};
module.exports = { getAllUsers, getUser, deleteUser };
