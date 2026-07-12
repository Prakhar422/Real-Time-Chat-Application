const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

// Dummy login (create user if not exists)
router.post("/login", userController.loginUser);

// Get all users
router.get("/", userController.getUsers);

module.exports = router;