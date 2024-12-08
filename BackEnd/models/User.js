const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Notification schema for embedding in UserSchema
const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  type: { // Notification type
    type: String,
    enum: ['info', 'sale', 'approved'], // Add more types as needed
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

// User schema
const UserSchema = new mongoose.Schema({
  imageUrls: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property', // Reference to the Property model
  }],
  notifications: [NotificationSchema], // Embed notifications array
});

// Pre-save hook to hash the password before saving to the DB
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Match password method for login comparison
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
