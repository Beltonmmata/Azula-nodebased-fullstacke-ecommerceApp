const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error("🔥 ERROR LOG:", err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // Handle Mongoose Validation Errors (create/update failures)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: messages.join(", ") });
  }

  // Handle Mongoose Duplicate Key Errors
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res
      .status(StatusCodes.CONFLICT)
      .json({ msg: `Duplicate value for ${field}` });
  }

  // Handle Cast Errors (e.g. bad ObjectId format for non-manually validated routes)
  if (err.name === "CastError") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Invalid value for field '${err.path}': ${err.value}`,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: "Something went wrong, try again later",
  });
};

module.exports = errorHandlerMiddleware;
