import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStudentId } from "../../src/studentSlice";

const Home = () => {
  const students = [
    "66d5ea599eb59f4c46b9c314",
    "66d5ea7a9eb59f4c46b9c318",
    "66d5ea8a9eb59f4c46b9c31d",
    "66d6887017d8375d2eadbe59",
    "66d6888017d8375d2eadbe5d",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectStudent = () => {
    const randomStudentId =
      students[Math.floor(Math.random() * students.length)];
    dispatch(setStudentId(randomStudentId));
    navigate("/student");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Welcome to Alemeno Assignment
      </h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Want to know about all the courses?
          </h2>
          <Link
            to="/courses"
            className="text-xl text-blue-500 hover:underline"
          >
            View Courses
          </Link>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Already a student?
          </h2>
          <button
            onClick={handleSelectStudent}
            className="w-full px-4 py-2 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Go to Student Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
