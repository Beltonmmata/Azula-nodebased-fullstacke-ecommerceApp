const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../middleware/authentication");

const {
  getAllDeliveryOptions,
  createDeliveryOption,
  getDeliveryOption,
  updateDeliveryOption,
  deleteDeliveryOption,
} = require("../controllers/DeliveryOptions");

router
  .route("/")
  .get(getAllDeliveryOptions)
  .post(isAuth, isAdmin, createDeliveryOption);
router
  .route("/:id")
  .get(getDeliveryOption)
  .patch(isAuth, isAdmin, updateDeliveryOption)
  .delete(isAuth, isAdmin, deleteDeliveryOption);

module.exports = router;
