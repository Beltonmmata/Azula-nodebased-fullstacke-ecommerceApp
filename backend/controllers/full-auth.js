// 📁 backend/controllers/authController.js
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const sendEmail = require("../utils/emailServices");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../errors");

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const sendTokenResponse = (
  res,
  user,
  message = "Authentication successful"
) => {
  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({
    success: true,
    message,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      promoCode: user.promoCode,
      createdAt: user.createdAt,
    },
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) throw new BadRequestError("User already exists");

  const basePromo = name.trim().toLowerCase().replace(/\s+/g, "");
  let promoCode = basePromo;
  let counter = 1;

  while (await User.findOne({ promoCode })) {
    promoCode = `${basePromo}${counter}`;
    counter++;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    promoCode,
  });

  sendTokenResponse(res, user, "User registered successfully");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new BadRequestError("Invalid credentials");
  }
  sendTokenResponse(res, user, "Login successful");
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Logged out successfully",
    data: {},
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError("User not found");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  user.resetOtp = hashedOtp;
  user.resetOtpExpiry = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Your OTP to reset password",
    text: `Use the OTP code below to reset your password: ${otp}`,
    html: `<p>Enter the following OTP to reset your password:</p><h2>${otp}</h2><p>Token will expire after 10 minutes</p>`,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "OTP sent to email",
    data: {},
  });
};

const resetPassword = async (req, res) => {
  const { otp, password } = req.body;
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  const user = await User.findOne({
    resetOtp: hashedOtp,
    resetOtpExpiry: { $gt: Date.now() },
  });

  if (!user) throw new BadRequestError("OTP is invalid or expired");

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetOtpExpiry = undefined;
  await user.save();

  sendTokenResponse(res, user, "Password reset successful");
};
const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Current user fetched",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      promoCode: user.promoCode,
      createdAt: user.createdAt,
    },
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getCurrentUser,
};
