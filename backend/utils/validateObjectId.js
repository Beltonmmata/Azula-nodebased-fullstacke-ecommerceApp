const mongoose = require("mongoose");
const { BadRequestError } = require("../errors");

const validateObjectId = (id, resourceName = "resource") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Invalid ${resourceName} ID: ${id}`);
  }
};

module.exports = validateObjectId;
