const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
    type: String,
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  enrollmentStatus: {
    type: String,
    enum: ['Open', 'Closed', 'In Progress'],
    required: true,
  },
  courseDuration: {
    type: String, 
    required: true,
  },
  schedule: {
    type: String, 
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  prerequisites: {
    type: [String], 
    default: [],
  },
  syllabus: {
    type: [
      {
        title: String,
        content: String,
      }
    ], 
    default: [],
  },
})

module.exports = mongoose.model('Course', courseSchema);