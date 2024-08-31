import React, { useState, useEffect } from "react";
import axios from "axios";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/courses");
      setCourses(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []); 

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="border-2 border-yellow-400 rounded-lg p-2 mx-auto my-4"
        onChange={(e) => {
            setSearchTerm(e.target.value);
        }}
      />
      <button onClick={()=>console.log('Filtered courses:', filteredCourses)}>
        Search courses
      </button>
    
      <div className="flex flex-wrap mx-auto gap-4 cursor-pointer justify-center my-4">
        {filteredCourses.map((course) => (
          <div className="border-2 hover:scale-125 hover:z-40 hover:border-black hover:bg-orange-200 hover:text-white transition-all rounded-xl flex flex-col p-4 items-center justify-center w-[300px] text-yellow-400" key={course.id}>
            <h2 className="text-yellow-700">{course.name}</h2>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
