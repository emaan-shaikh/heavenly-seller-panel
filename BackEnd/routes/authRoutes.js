const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// POST /api/auth/signup - User Signup
router.post('/signup', signup);

// POST /api/auth/login - User Login
router.post('/login', login);

module.exports = router;
