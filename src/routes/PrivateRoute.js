import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    const toastId = "login-warning";
    if (!toast.isActive(toastId)) {
      toast.warning("Please log in to access this page", { toastId });
    }
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
