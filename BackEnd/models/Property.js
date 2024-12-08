const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  propertyTitle: {
    type: String,
    required: true,
  },
  propertyDescription: {
    type: String,
    required: true,
  },
  propertyCategory: {
    type: String,
    enum: ["Apartment", "Condo", "House", "Villa"],
    required: true,
  },
  listedIn: {
    type: String,
    enum: ["Sell", "Rent"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taxRate: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  kitchens: {
    type: Number,
    required: false,
  },
  garages: {
    type: Number,
    required: false,
  },
  garageSize: {
    type: String,
    required: false,
  },
  yearBuilt: {
    type: String,
    required: false,
  },
  floors: {
    type: Number,
    required: false,
  },
  additionalInfo: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  amenities: {
    ac: { type: Boolean, default: false },
    heating: { type: Boolean, default: false },
    pool: { type: Boolean, default: false },
    garden: { type: Boolean, default: false },
    lawn: { type: Boolean, default: false },
    elevator: { type: Boolean, default: false },
    fireplace: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
  },
  imageUrls: {
    type: [String], // Array of uploaded image URLs
    required: true,
  },
  listedOn: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true, // Email is necessary for querying properties by user
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
