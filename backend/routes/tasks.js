// backend/routes/tasks.js

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// 1. CREATE: Add a newly created task to the database
router.post('/', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create task', error: error.message });
    }
});

// 2. READ: Fetch all available tasks from the database
router.get('/', async (req, res) => {
    try {
        // Sort tasks by newest first
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
});

// 3. UPDATE: Modify an existing task's details or status by its ID
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update task', error: error.message });
    }
});

// 4. DELETE: Remove a specific task completely from the database
router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error: error.message });
    }
});

module.exports = router;