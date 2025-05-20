const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/authentication");

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getCurrentUser,
} = require("../controllers/full-auth");
const { isAuth } = require("../middleware/authentication");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/forgetpassword", forgotPassword);
router.post("/resetpassword", resetPassword);
router.post("/logout", logoutUser);
router.get("/current-user", isAuth, getCurrentUser);

module.exports = router;
