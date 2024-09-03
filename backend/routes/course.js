const express = require("express");
const router = express.Router();
const Course = require("../models/courses");
const Student = require("../models/student");
const mongoose = require("mongoose");


router.post("/", async (req, res) => {
  try {
    const {
      courseName,
      instructorName,
      description,
      enrollmentStatus,
      courseDuration,
      schedule,
      location,
      prerequisites,
      syllabus,
    } = req.body;

    // Validate required fields
    if (
      !courseName ||
      !instructorName ||
      !description ||
      !enrollmentStatus ||
      !courseDuration ||
      !schedule ||
      !location
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }


    const newCourse = new Course({
      courseName,
      instructorName,
      description,
      enrollmentStatus,
      courseDuration,
      schedule,
      location,
      prerequisites: prerequisites || [],
      syllabus: syllabus || [],
    });


    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/students", async (req, res) => {
  try {
    const studentData = req.body;
    const student = new Student(studentData);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/findAll", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
