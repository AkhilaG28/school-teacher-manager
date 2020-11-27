import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Register from "./LandingPage/Register";
import Login from "./LandingPage/Login";
import LandingPage from "./LandingPage/LandingPage";
import Dashboard from "./Dashboard/Dashboard";
import AddTeacher from "./Dashboard/AddTeacher";
import TeacherDetails from "./Dashboard/TeacherDetails";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={LandingPage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/addTeacher" component={AddTeacher} />
      <Route path="/teacherDetails/:id" component={TeacherDetails} />
    </div>
  );
}

export default App;
