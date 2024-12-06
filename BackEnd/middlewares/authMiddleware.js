// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const protect = async (req, res, next) => {
  let token;

  // Check if token is in cookies or headers
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password'); // Exclude password
    if (!req.user) {
      return res.status(404).json({ message: 'User  not found' });
    }
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = protect;

// Correctly export the protect function
module.exports = protect;
