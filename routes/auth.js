const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// @desc    Register User
// @route   POST /auth/register
router.post("/register", (req, res) => register(req, res));

// @desc    Login User (JWT)
// @route   POST /auth/login
router.post("/login", (req, res) => login(req, res));

module.exports = router;
