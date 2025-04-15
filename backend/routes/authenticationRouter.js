const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/full-auth");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/forgetpassword", forgotPassword);
router.post("/resetpassword", resetPassword);
router.post("/logout", logoutUser);

module.exports = router;
