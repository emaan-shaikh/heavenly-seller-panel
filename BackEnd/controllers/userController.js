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


// Function to update the user profile
const updateProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { username, email, password, profilePicture } = req.body;

    // Ensure the email cannot be updated to a conflicting one
    if (email && email !== req.user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Update user details
    const updatedData = {
      ...(username && { username }),
      ...(email && { email }),
      ...(profilePicture && { profilePicture }), // Update profile picture URL if provided
    };

    // Hash password if it is updated
    if (password) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    // Find user and update their profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true, runValidators: true } // Return updated user and validate schema
    ).select('-password'); // Exclude password from response

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};

