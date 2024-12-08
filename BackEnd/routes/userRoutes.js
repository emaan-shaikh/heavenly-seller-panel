// routes/userRoutes.js
const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  // addToFavorites,
  // getFavorites,
  // removeFromFavorites,
  getProfile,
} = require('../controllers/userController');

const router = express.Router();

router.get('/profile', protect, getProfile);
// router.get("/favorites", protect, getFavorites);
// router.post("/remove-from-favorites", protect, removeFromFavorites);
// router.post('/add-to-favorites', protect, addToFavorites);

module.exports = router;