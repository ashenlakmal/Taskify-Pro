// backend/models/Task.js

const mongoose = require('mongoose');

// Define the structure (schema) for a Task document in MongoDB
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },
    dueDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    }
}, {
    // Automatically manage createdAt and updatedAt timestamps
    timestamps: true
});

// Export the Task model to interact with the database
module.exports = mongoose.model('Task', taskSchema);