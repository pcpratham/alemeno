const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  enrolledCourses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      progress: {
        type: Number, 
        default: 0,
      },
      dueDate: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Student', StudentSchema);
