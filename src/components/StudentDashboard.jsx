import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';


const StudentDashboard = () => {
  const studentId = useSelector((state) => state.student.studentId);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = import.meta.env.VITE_DATABASE_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}/student/${studentId}`);
        setCourses(response.data.enrolledCourses);
        // console.log("courses: ", response.data.enrolledCourses);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [studentId]);

  const markAsCompleted = async (courseId) => {
    try {
      await axios.put(
        `${url}/students/${studentId}/courses/${courseId}/complete`
      );

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.courseId._id === courseId
            ? { ...course, completed: true, progress: 100 }
            : course
        )
      );
    } catch (error) {
      console.error("Error marking course as completed:", error);
    }
  };

  const dateConvert = (datee) => {
    const date = new Date(datee);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if(loading){
    return (
      <div className="text-center text-lg">
        Loading...
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">My Courses</h1>
      <ul className="space-y-6">
        {courses.map((course) => (
          <li
            key={course.courseId._id}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div className="text-2xl font-semibold text-green-600">
                {course.courseId.courseName}
              </div>
              <button
                onClick={() => markAsCompleted(course.courseId._id)}
                disabled={course.completed}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  course.completed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {course.completed ? "Completed" : "Mark as Completed"}
              </button>
            </div>
            <div className="mt-4">
              <div className="text-lg font-medium">
                Instructor: {course.courseId.instructorName}
              </div>
              <div className="text-lg font-medium">
                Due Date: {dateConvert(course.dueDate)}
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Progress:
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-600 h-4 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
