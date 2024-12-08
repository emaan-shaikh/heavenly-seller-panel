const mongoose = require("mongoose");
const User = require("./models/User"); // Import the User model
require("dotenv").config(); // Load environment variables

const seedNotifications = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Find a user to add notifications to
    const user = await User.findOne({ email: "testuser@example.com" }); // Replace with an actual email
    if (!user) {
      console.log("User not found. Please add a user before running the seed script.");
      return;
    }

    // Dummy notifications
    const notifications = [
      {
        message: "You have a new request to approve.",
        type: "sale",
        date: new Date(),
        read: false,
      },
      {
        message: "Your property has been approved.",
        type: "approved",
        date: new Date(),
        read: false,
      },
    ];

    // Add notifications to the user
    user.notifications.push(...notifications);

    // Save the user with new notifications
    await user.save();

    console.log("Dummy notifications added successfully!");
    process.exit(); // Exit the script
  } catch (error) {
    console.error("Error seeding notifications:", error);
    process.exit(1); // Exit with failure
  }
};

// Run the seeding script
seedNotifications();
