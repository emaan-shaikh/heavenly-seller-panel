const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();


// Middlewares
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));

// Routes
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require("./routes/propertyRoutes");
const notificationRoutes = require('./routes/notificationRoutes');
const userRoutes = require('./routes/userRoutes');




// Connect to MongoDB
connectDB();

// Static files for frontend
// app.use(express.static(path.join(__dirname, '../FrontEnd/customer-panel/public')));

// API routes
app.use('/api/auth', authRoutes);
app.use("/api/properties", propertyRoutes);
app.use('/api/notifications', notificationRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.path}`);
  next();
});





app.get("/", (req, res) => {

  res.send("API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
