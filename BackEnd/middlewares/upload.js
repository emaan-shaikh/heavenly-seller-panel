const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "properties", // Folder in Cloudinary where images will be stored
    allowed_formats: ["jpeg", "png", "jpg"], // Allow only these file types
  },
});

const upload = multer({ storage });

module.exports = upload;
