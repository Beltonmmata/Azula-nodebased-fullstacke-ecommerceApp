const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/authentication");

const {
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewsController");

// ✍️ Create a review
router.post("/", isAuth, createReview);

// ✏️ Update review (by user)
router.put("/:reviewId", isAuth, updateReview);

// 🗑 Delete review (by user)
router.delete("/:reviewId", isAuth, deleteReview);

module.exports = router;
