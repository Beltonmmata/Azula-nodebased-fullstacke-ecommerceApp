const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

router.get("/:code", async (req, res) => {
  const promo = await User.findOne({ promoCode: req.params.code });
  if (!promo) throw new NotFoundError("Invalid Promocode");
  res
    .status(StatusCodes.OK)
    .json({ message: `Valid Promocode: ${promo.name}` });
});

module.exports = router;
