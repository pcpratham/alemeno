import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState([]);

  const url = import.meta.env.VITE_DATABASE_URL;

  useEffect(() => {
    fetch(`${url}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Course not found');
        }
        return response.json();
      })
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const toggleExpand = (index) => {
    setExpanded((prevExpanded) =>
      prevExpanded.includes(index)
        ? prevExpanded.filter((i) => i !== index)
        : [...prevExpanded, index]
    );
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!course) {
    return <div className="text-center text-gray-500">No course found</div>;
  }

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700" >Course Details</h1>
      <h1 className="text-2xl font-bold mb-4">{course.courseName}</h1>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Instructor:</span> {course.instructorName}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Course Details:</span> {course.description}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Enrollment Status:</span> {course.enrollmentStatus}
      </p>
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Duration:</span> {course.courseDuration}
      </p>
      <p className="text-lg text-gray-700 mb-4">
        <span className="font-semibold">Mode:</span> {course.location}
      </p>

      <div className="border-t border-gray-300 pt-4">
        <h3 className="text-2xl font-semibold mb-4">Syllabus</h3>
        {course.syllabus.map((item, index) => (
          <div key={index} className="mb-2">
            <div
              className="flex justify-between items-center bg-gray-200 p-3 rounded-lg cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <span className="text-gray-600">
                {expanded.includes(index) ? '-' : '+'}
              </span>
            </div>
            {expanded.includes(index) && (
              <div className="bg-gray-100 p-3 rounded-lg mt-2">
                <p className="text-gray-700">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetails;
