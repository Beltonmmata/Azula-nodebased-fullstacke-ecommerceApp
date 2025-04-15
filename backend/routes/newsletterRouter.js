const express = require("express");
const router = express.Router();
const {
  subscribeToNewsletter,
  getAllSubscribers,
} = require("../controllers/newsletterController");
const { isAuth, isAdmin } = require("../middleware/authentication");

router.post("/", subscribeToNewsletter);
router.get("/", isAuth, isAdmin, getAllSubscribers);

module.exports = router;
