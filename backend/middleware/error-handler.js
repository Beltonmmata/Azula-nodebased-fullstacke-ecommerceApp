const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error("🔥 ERROR LOG:", err);

  // Handle custom app errors
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: [],
    });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: messages.join(", "),
      data: [],
    });
  }

  // Handle duplicate key errors
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(StatusCodes.CONFLICT).json({
      success: false,
      message: `Duplicate value for ${field}`,
      data: [],
    });
  }

  // Handle bad ObjectId errors
  if (err.name === "CastError") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Invalid value for field '${err.path}': ${err.value}`,
      data: [],
    });
  }

  // Fallback - unexpected errors
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong, try again later",
    data: [],
  });
};

module.exports = errorHandlerMiddleware;
