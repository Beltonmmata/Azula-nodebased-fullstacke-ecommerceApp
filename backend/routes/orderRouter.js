const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../middleware/authentication");

const {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

router.route("/").get(isAuth, getAllOrders).post(isAuth, createOrder);
router
  .route("/:id")
  .get(isAuth, getOrder)
  .patch(isAuth, isAdmin, updateOrder)
  .delete(isAuth, deleteOrder);
router.route("/:id/status").patch(isAuth, isAdmin, updateOrderStatus);
router.route("/:id/cancel").patch(isAuth, cancelOrder);

module.exports = router;
