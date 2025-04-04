const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../middleware/authentication");
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(isAuth, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch(isAuth, isAdmin, updateProduct)
  .delete(isAuth, isAdmin, deleteProduct);

module.exports = router;
