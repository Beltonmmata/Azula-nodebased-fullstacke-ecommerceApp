const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../middleware/authentication");

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/user");

router.route("/").get(isAuth, isAdmin, getAllUsers);
router
  .route("/:id")
  .get(isAuth, getUser)
  .delete(isAuth, isAdmin, deleteUser)
  .patch(isAuth, isAdmin, updateUser);

module.exports = router;
