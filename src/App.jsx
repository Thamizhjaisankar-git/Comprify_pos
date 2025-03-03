import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LogIn />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
