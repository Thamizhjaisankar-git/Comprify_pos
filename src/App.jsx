import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import LogIn from "./pages/loginPage/LogIn";
import Home from "./pages/home/Home";

import PrivateRoute from "./privateRoute"; // Import PrivateRoute component

function App() {
  const token = localStorage.getItem("token");

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            {/* Private Route: Only accessible if logged in */}
            <Route path="/" element={<PrivateRoute Component={Home} />} />

            {/* Public Routes: Only accessible if NOT logged in */}
            {!token && <Route path="/login" element={<LogIn />} />}

            {/* Redirect all unknown routes */}
            <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
