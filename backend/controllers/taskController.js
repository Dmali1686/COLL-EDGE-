const Task = require('../models/Task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const { status, priority, sortBy } = req.query;
    
    // Filtering
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Sorting
    let sortQuery = { createdAt: -1 }; // Default sort by newest
    if (sortBy === 'oldest') sortQuery = { createdAt: 1 };
    else if (sortBy === 'priority') sortQuery = { priority: -1 }; // Basic sort

    const tasks = await Task.find(query).sort(sortQuery);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// Create a task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    
    // Basic validation handled by Mongoose, but we can add more if needed
    const newTask = new Task({ title, description, status, priority });
    const savedTask = await newTask.save();
    
    res.status(201).json(savedTask);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation Error', errors: messages });
    }
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, priority },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation Error', errors: messages });
    }
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
