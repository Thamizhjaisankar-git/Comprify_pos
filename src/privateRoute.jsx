import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ Component }) => {
  const token = localStorage.getItem("token");

  // Accessing store information from Redux
  const storeInfo = useSelector((state) => state.store.storeInfo);

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Redirect to store-info page if store info is not provided
  if (!storeInfo) {
    return <Navigate to="/store-info" />;
  }

  // Render the component if both token and store info exist
  return <Component />;
};

export default PrivateRoute;
