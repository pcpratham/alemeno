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

router.get("/:id", async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/student/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    // Find student by ID and populate the enrolled courses
    const student = await Student.findById(studentId).populate(
      "enrolledCourses.courseId"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return the student details
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.put('/students/:studentId/courses/:courseId/complete', async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    // Find the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find the specific course in the enrolledCourses array
    const enrolledCourse = student.enrolledCourses.find(
      course => course.courseId.toString() === courseId
    );

    if (!enrolledCourse) {
      return res.status(404).json({ message: 'Course not found in enrolled courses' });
    }

    // Update the completed field to true if it was false
    if (!enrolledCourse.completed) {
      enrolledCourse.completed = true;
    } else {
      return res.status(400).json({ message: 'Course already marked as completed' });
    }

    // Save the updated student document
    await student.save();

    // Respond with the updated student data
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
