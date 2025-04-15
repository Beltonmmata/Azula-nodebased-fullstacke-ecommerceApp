const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/authentication");

const { unlikeProduct, likeProduct } = require("../controllers/likes");

// ✅ Like a product
router
  .route("/:productId")
  .post(isAuth, likeProduct)
  .delete(isAuth, unlikeProduct);

module.exports = router;
