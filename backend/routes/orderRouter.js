const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/authentication");

const {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/").get(getAllOrders).post(isAuth, createOrder);
router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
