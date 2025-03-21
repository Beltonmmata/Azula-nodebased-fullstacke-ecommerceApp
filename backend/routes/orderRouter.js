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

router.route("/").get(isAuth, getAllOrders).post(isAuth, createOrder);
router
  .route("/:id")
  .get(isAuth, getOrder)
  .patch(isAuth, updateOrder)
  .delete(isAuth, deleteOrder);

module.exports = router;
