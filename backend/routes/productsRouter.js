const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../middleware/authentication");
const { upload } = require("../config/multerConfig");
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

router
  .route("/")
  .get(getAllProducts)
  .post(isAuth, isAdmin, upload.single("image"), createProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch(isAuth, isAdmin, upload.single("image"), updateProduct)
  .delete(isAuth, isAdmin, deleteProduct);

module.exports = router;
