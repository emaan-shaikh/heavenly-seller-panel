const express = require('express');
require('dotenv').config(); // Load environment variables
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const app = express();

// Routes
const authRoutes = require('./routes/authRoutes');



// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connect to MongoDB
connectDB();

// Static files for frontend
// app.use(express.static(path.join(__dirname, '../FrontEnd/customer-panel/public')));

// API routes
app.use('/api/auth', authRoutes);



app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
