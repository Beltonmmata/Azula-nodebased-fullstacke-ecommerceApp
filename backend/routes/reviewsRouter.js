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
router.patch("/:id", isAuth, updateReview);

// 🗑 Delete review (by user)
router.delete("/:id", isAuth, deleteReview);

module.exports = router;
