const { statusCode } = require("http-status-codes");
const notFound = (req, res) =>
  res.status(statusCode.NOT_FOUND).send({ message: "Route does not exist" });
module.exports = notFound;
