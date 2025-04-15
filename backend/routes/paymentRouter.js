const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/authentication");
const {
  initiatePayment,
  handleCallback,
} = require("../controllers/mpesaController");

router.post("/lipanampesa", isAuth, initiatePayment);
router.post("/lipanampesa/callback", handleCallback);

module.exports = router;
