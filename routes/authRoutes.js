const express = require("express");
const { signup, login } = require("../controllers/authController");


const router = express.Router();

// POST /api/auth/register
router.post("/register", signup);

// POST /api/auth/login
router.post("/login", login);

module.exports = router;
