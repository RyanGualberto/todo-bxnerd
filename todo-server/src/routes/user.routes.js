const express = require("express");
const router = express.Router();

const {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");

router.post("/register", createUser);

router.get("/user/:id", getUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

module.exports = router;
