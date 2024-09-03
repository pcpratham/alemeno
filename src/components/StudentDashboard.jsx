import React, { useEffect, useState } from 'react';

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetch('http://localhost:5000/students')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        return response.json();
      })
      .then(data => {
        setStudent(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{student.name}'s Dashboard</h1>
      <h2>Enrolled Courses</h2>
      <ul>
        {student.enrolledCourses.map(enrolled => (
          <CourseItem key={enrolled.courseId} enrolled={enrolled} />
        ))}
      </ul>
    </div>
  );
}

function CourseItem({ enrolled }) {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Fetch course details
    fetch(`http://localhost:5000/courses/${enrolled.courseId}`)
      .then(response => response.json())
      .then(data => setCourse(data));
  }, [enrolled.courseId]);

  const markAsCompleted = () => {
    // Implement the logic to mark the course as completed in the backend
    fetch(`http://localhost:5000/students`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        enrolledCourses: [
          ...student.enrolledCourses.map(course => 
            course.courseId === enrolled.courseId
              ? { ...course, completed: true }
              : course
          )
        ]
      })
    }).then(() => {
      // Update the UI after marking as completed
      setCourse(prev => ({ ...prev, completed: true }));
    });
  };

  if (!course) return null;

  return (
    <li>
      <div>
        <img src={course.thumbnail} alt={course.title} width="100" />
        <h3>{course.title}</h3>
        <p>Instructor: {course.instructor}</p>
        <p>Due Date: {course.dueDate}</p>
        <div>
          <label>Progress:</label>
          <progress value={course.progress} max="100">{course.progress}%</progress>
        </div>
        <button onClick={markAsCompleted} disabled={enrolled.completed}>
          {enrolled.completed ? 'Completed' : 'Mark as Completed'}
        </button>
      </div>
    </li>
  );
}

export default StudentDashboard;
