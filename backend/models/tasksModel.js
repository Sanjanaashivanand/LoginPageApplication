const mongoose = require('mongoose')

// Define the schema for the Task collection
const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Todo', 'InProgress', 'Done'],
      default: 'Todo',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
   
  });
  

  module.exports = mongoose.model('Task', taskSchema);