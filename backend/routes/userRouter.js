const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../middleware/authentication");

const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  updateMyAccount,
  deleteMyAccount,
} = require("../controllers/user");

router.route("/").get(isAuth, isAdmin, getAllUsers);
router
  .route("/:id")
  .get(isAuth, getUser)
  .delete(isAuth, isAdmin, deleteUser)
  .patch(isAuth, isAdmin, updateUser);
router.route("/me/update").patch(isAuth, updateMyAccount);
router.route("/me/delete").delete(isAuth, deleteMyAccount);
module.exports = router;
