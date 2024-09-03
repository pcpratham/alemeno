import React from "react";
import { Link } from "react-router-dom";
import StudentDashboard from "../components/StudentDashboard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStudentId } from "../../src/studentSlice";

const Home = () => {
  const student = [
    "66d5ea599eb59f4c46b9c314",
    "66d5ea7a9eb59f4c46b9c318",
    "66d5ea8a9eb59f4c46b9c31d",
    "66d6887017d8375d2eadbe59",
    "66d6888017d8375d2eadbe5d",
  ];
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelectStudent = () => {
    const randomStudentId = student[Math.floor(Math.random() * student.length)];
    dispatch(setStudentId(randomStudentId));
    navigate("/student");
  };
  return (
    <div>
      <h1> Welcome to Alemeno Assigment</h1>
      <div>
        <h2>Want to know about all the courses: </h2>
        <Link to="/courses">Courses</Link>
      </div>
      <div>
        <h2>Already a student: </h2>
        <button
          onClick={handleSelectStudent}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go to Student Dashboard
        </button>
      </div>
    </div>
  );
};

export default Home;
