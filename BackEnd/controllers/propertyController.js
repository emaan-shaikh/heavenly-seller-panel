const Property = require("../models/Property");

// Controller to handle adding a property
const addProperty = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const imageUrls = req.files.map((file) => file.path);

    const {
      propertyTitle,
      propertyDescription,
      propertyCategory,
      listedIn,
      price,
      taxRate,
      size,
      bedrooms,
      bathrooms,
      kitchens,
      garages,
      garageSize,
      yearBuilt,
      floors,
      additionalInfo,
      address,
      country,
      city,
      zipCode,
      amenities,
      email, // Now required
    } = req.body;

    const propertyData = {
      propertyTitle,
      propertyDescription,
      propertyCategory,
      listedIn,
      price,
      taxRate,
      size,
      bedrooms,
      bathrooms,
      kitchens,
      garages,
      garageSize,
      yearBuilt,
      floors,
      additionalInfo,
      address,
      country,
      city,
      zipCode,
      amenities: typeof amenities === "string" ? JSON.parse(amenities) : amenities,
      imageUrls,
      email, // Save email in the property document
    };

    const newProperty = new Property(propertyData);
    await newProperty.save();

    res.status(201).json({
      message: "Property added successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ error: "Failed to add property" });
  }
};



const getProperties = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required for querying properties." });
    }

    const properties = await Property.find({ email });
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};


const getPropertyById = async (req, res) => {
  const { id } = req.params;
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required to fetch the property." });
  }

  try {
    // Find the property by its ID and email
    const property = await Property.findOne({ _id: id, email });

    if (!property) {
      return res.status(404).json({ error: "Property not found or access denied." });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error.message);
    res.status(500).json({ error: "Failed to fetch property details." });
  }
};


// Controller to handle updating a property
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;
    const updatedData = req.body;

    console.log("Update Request:", { id, email, updatedData }); // Debugging

    const property = await Property.findOneAndUpdate(
      { _id: id, email },
      updatedData,
      { new: true, runValidators: true } // `new` returns updated doc, `runValidators` validates schema
    );

    if (!property) {
      return res.status(404).json({ error: "Property not found or access denied." });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error updating property:", error.message, error.errors || error.stack);
    res.status(500).json({
      error: "Failed to update property.",
      details: error.errors || error.message,
    });
  }
  
};


const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query; // Ensure the user's email is provided

    console.log("Delete Request:", { id, email }); // Debugging

    const property = await Property.findOneAndDelete({ _id: id, email });

    if (!property) {
      return res.status(404).json({ error: "Property not found or access denied." });
    }

    res.status(200).json({ message: "Property deleted successfully." });
  } catch (error) {
    console.error("Error deleting property:", error.message, error.stack);
    res.status(500).json({ error: "Failed to delete property." });
  }
};




module.exports = { addProperty, getProperties, getPropertyById, updateProperty, deleteProperty };
