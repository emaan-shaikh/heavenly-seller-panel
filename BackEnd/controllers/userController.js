// controllers/userController.js

const User = require('../models/User');
const Property = require('../models/Property');
const jwt = require('jsonwebtoken');  // Make sure JWT is required for decoding

// Function to get the user profile
const getProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Since req.user is already populated by the middleware, we can use it directly
    const user = req.user; // No need to fetch the user again from the database
    res.status(200).json(user); // Send the user data back, excluding the password
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Export all functions
module.exports = {
  getProfile
};