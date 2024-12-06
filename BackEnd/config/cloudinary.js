const cloudinary = require("cloudinary").v2;

// Use CLOUDINARY_URL from environment variables
cloudinary.config({ 
  cloudinary_url: process.env.CLOUDINARY_URL,
});

module.exports = cloudinary;
