import React, { useState, useEffect } from "react";
import "./App.css";
import DashBoard from "./components/DashBoard";
import SchoolTimeTable from "./components/SchoolTimeTable";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GroupTimeTable from "./components/GroupTimeTable";
import TeacherTimeTable from "./components/teacherTimeTable";
import axios from "axios";

function App() {

  const [ allLessons, setAllLessons ] = useState( [] );

  const getAllLesson = async ( allLessons ) => {
    try {
      const res = await axios.get( `http://localhost:3001/lesson` );
      setAllLessons( res.data );
    } catch ( error ) {
      throw error;
    }
  }

  useEffect( () => {
    getAllLesson();
  }, [] );





  return (
    <div className="App">
      { <Router>
        <DashBoard />
        <Route exact path="/"><SchoolTimeTable all={ allLessons } /></Route>
        <Route path="/groupTimeTable"> <GroupTimeTable allLessons={ allLessons } /></Route>
        <Route path="/teacherTimeTable"><TeacherTimeTable allLessons={ allLessons } /></Route>
      </Router> }
    </div >
  );

}

export default App;