// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import the task routes
const taskRoutes = require('./routes/tasks');

// Initialize the Express application
const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json());

// Register API routes
app.use('/api/tasks', taskRoutes);

// MongoDB connection setup using Mongoose
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Successfully connected to Local MongoDB!!'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Basic health check route
app.get('/', (req, res) => {
    res.send('Taskify Pro API is up and running!');
});

// Initialize the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running beautifully on port: ${PORT}`);
});