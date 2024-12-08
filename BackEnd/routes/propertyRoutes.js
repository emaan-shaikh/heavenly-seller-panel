const express = require("express");
const upload = require("../middleware/upload"); // Multer middleware for Cloudinary

const router = express.Router();



const {
  addProperty,
  getProperties,
  getPropertyById,
  deleteProperty,
  updateProperty,
} = require("../controllers/propertyController");


// Route to add a property
router.post("/", upload.array("images", 5), addProperty);

// Route to fetch properties (filtered by email or other criteria)
router.get("/", getProperties);

// Route to fetch a property by ID
router.get("/:id", getPropertyById);

// Route to update a property
router.put("/:id", upload.array("images", 5), updateProperty);

// Route to delete a property
router.delete("/:id", deleteProperty);

// // Route to update a property
// router.put("/:id", upload.array("images", 5), updateProperty);

module.exports = router;
