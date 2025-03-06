import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/loginPage/LogIn";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landingPage/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LogIn />}></Route>
        <Route exact path="/" element={<Dashboard />}></Route>
        {/* <Route exact path="/" element={<LandingPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
