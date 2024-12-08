const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "properties", // Folder in Cloudinary
    format: async (req, file) => "png", // Supports async format determination
    public_id: (req, file) => file.originalname.split(".")[0], // Use the original file name
  },
});

const upload = multer({ storage });

module.exports = upload;
