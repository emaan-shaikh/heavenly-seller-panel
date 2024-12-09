// routes/userRoutes.js
const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  // addToFavorites,
  // getFavorites,
  updateProfile,
  getProfile,
} = require('../controllers/userController');

const router = express.Router();

// Fetch user profile
router.get('/profile', protect, getProfile);

// Update user profile
router.put('/profile', protect, updateProfile);

module.exports = router;