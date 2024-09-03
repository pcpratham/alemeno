import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const url = import.meta.env.VITE_DATABASE_URL;
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${url}/findAll`);
      setCourses(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search for courses..."
          className="w-full border-2 border-yellow-400 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              className="border-2 border-gray-300 hover:scale-105 hover:z-10 hover:bg-yellow-400 hover:text-white transition-all duration-300 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer"
              key={course._id}
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <h2 className="text-xl font-bold mb-2 text-yellow-700">
                {course.courseName}
              </h2>
              <p>Instructor : {course.instructorName}</p>
              <p className="text-sm text-gray-600">
                {course.description.length > 100
                  ? `${course.description.substring(0, 100)}...`
                  : course.description}
              </p>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full ">
            <p className="text-gray-500 text-center ">No courses found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseList;
