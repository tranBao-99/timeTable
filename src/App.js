import React/*,{ useState }*/ from "react";
import "./App.css";
import DashBoard from "./components/DashBoard";
import SchoolTimeTable from "./components/SchoolTimeTable";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GroupTimeTable from "./components/GroupTimeTable";
import TeacherTimeTable from "./components/teacherTimeTable"

function App() {



  return (
    <div className="App">
      { <Router>
        <DashBoard />
        <Route exact path="/" component={ SchoolTimeTable } />
        <Route path="/groupTimeTable" component={ GroupTimeTable } />
        <Route path="/teacherTimeTable" component={ TeacherTimeTable } />
      </Router> }
    </div >
  );

}

export default App;