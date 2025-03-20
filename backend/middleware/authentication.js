const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Import User model
const { UnauthenticatedError } = require("../errors");

const isAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Not authorized, no token provided");
  }

  const token = authHeader.replace("Bearer ", "");
  console.log("Received Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new UnauthenticatedError("User not found");
    }

    req.user = user; // Now req.user includes name & email
    console.log("Authenticated User:", req.user);

    next();
  } catch (error) {
    return next(new UnauthenticatedError("Not authorized, invalid token"));
  }
};

module.exports = { isAuth };
