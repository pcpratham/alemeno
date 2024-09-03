import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>No course found</div>;
  }

  return (
    <div>
      <h1>{course.courseName}</h1>
      <p>{course.instructorName}</p>
    </div>
  );
}

export default CourseDetails;
