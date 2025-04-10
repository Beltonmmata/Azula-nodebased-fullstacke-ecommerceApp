const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/authentication");

const { unlikeProduct, likeProduct } = require("../controllers/likes");

// ✅ Like a product
router.post("/", isAuth, likeProduct);

// ❌ Unlike a product
router.delete("/:productId", isAuth, unlikeProduct);

module.exports = router;
