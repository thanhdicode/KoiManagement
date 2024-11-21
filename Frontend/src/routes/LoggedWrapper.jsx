import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const LoggedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  // if user login yet
  if (token && user) {
    return <Navigate to="/" />;
  }
  return children;
};
export const VerifyEmailSignupWrapper = ({ children }) => {
  const email = useSelector((state) => state.account.email.email);
  if (!email) {
    return <Navigate to="/signup" />;
  }
  return children;
};
export const VerifyEmailForgetWrapper = ({ children }) => {
  const email = useSelector((state) => state.account.email.email);
  if (!email) {
    return <Navigate to="/forget" />;
  }
  return children;
};
export const ResetPassWrapper = ({ children }) => {
  const email = useSelector((state) => state.account.email.email);
  const otp = useSelector((state) => state.account.otp.otp);
  if (!email && !otp) {
    return <Navigate to="/forget" />;
  }
  return children;
};
