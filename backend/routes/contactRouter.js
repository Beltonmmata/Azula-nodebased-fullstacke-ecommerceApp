const express = require("express");
const router = express.Router();
const {
  submitContactForm,
  getAllContacts,
} = require("../controllers/contactController");
const { isAuth, isAdmin } = require("../middleware/authentication");

router.post("/", submitContactForm);
router.get("/", isAuth, isAdmin, getAllContacts);

module.exports = router;
