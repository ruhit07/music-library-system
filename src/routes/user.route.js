const express = require("express");
const router = express.Router();

// const { protect } = require("../middlewares/auth.middleware");

const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");

// router.use(protect);

router.route("/")
  .get(getUsers)
  .post(addUser);

router.route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
