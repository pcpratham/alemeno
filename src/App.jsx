import CourseList from "./components/CourseList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Course from "./pages/Course";
import StudentDashboard from "./components/StudentDashboard";


function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<CourseList/>} />
          <Route path="/course/:id" element={<Course/>} />
          <Route path="/student" element={<StudentDashboard/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

//  {/* <Router>
//         <div>
//           <Switch>
//             <Route exact path="/" component={<CourseList />} />
//             <Route path="/course/id" component={<Course />} />

//           </Switch>
//         </div>
//       </Router> */}


// <Route path="/contact" element={<Contact />} />
//           {/* 404 Route */}
//           // <Route path="*" element={<h1>404 Not Found</h1>} />