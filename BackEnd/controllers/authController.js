const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Helper function for validating email format
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

const signup = async (req, res) => {
  try {
    const { username, email, password, profileImage } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Use the default image if no profile image is provided
    const profileImagePath = profileImage || "/assets/Profile.png"; // Ensure '/assets/Profile.png' is publicly available

    // Create new user object with the profile image path
    const newUser = new User({
      username,
      email,
      password,
      profileImage: profileImagePath, // Save the image path or URL in the database
    });

    // Save the new user
    await newUser.save();

    // Send back the response with user data (excluding password) for confirmation
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
  module.exports = { signup, login };

  const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Your client ID here
    });
    const payload = ticket.getPayload();
    // Handle user creation or login here
    // Generate JWT and send it back to the frontend
  } catch (error) {
    res.status(400).json({ message: "Google login failed" });
  }
};

  