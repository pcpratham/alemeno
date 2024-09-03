import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = ({id}) => {
  const studentId = id;
  const [courses, setCourses] = useState([]);
  const url = import.meta.env.VITE_DATABASE_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${url}/student/${studentId}`);
        setCourses(response.data.enrolledCourses);
        console.log("courses: ", response.data.enrolledCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [studentId]);

  const markAsCompleted = async (courseId) => {
    try {
      await axios.put(`${url}/students/${studentId}/courses/${courseId}/complete`);
      
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.courseId._id === courseId ? { ...course, completed: true } : course
        )
      );
    } catch (error) {
      console.error('Error marking course as completed:', error);
    }
  };

  return (
    <div>
      <h1>My Courses</h1>
      <ul>
        {courses.map((course) => (
          <li className='my-4' key={course.courseId._id}>
            <div className='text-2xl text-green-600'>
              {course.courseId.courseName}
            </div>
            <button 
              onClick={() => markAsCompleted(course.courseId._id)} 
              disabled={course.completed}
            >
              {course.completed ? 'Completed' : 'Mark as Completed'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
