const express = require("express");
const router = express.Router();

const { getAllUsers, getUser, deleteUser } = require("../controllers/user");

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).delete(deleteUser);
//.patch(updateUser).

module.exports = router;
