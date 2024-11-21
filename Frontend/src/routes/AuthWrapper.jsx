import React from "react";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // if user not login yet
  if (!token && allowedRoles && allowedRoles.length > 0) {
    return <Navigate to="/login" />;
  }

  // allowed role
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default AuthWrapper;
