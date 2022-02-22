// packages
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// hooks
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { state, waitingForData } = useAuth();
  const location = useLocation();
  const { pathname } = location;
  const { user } = state;
  if (waitingForData) {
    return <></>;
  }
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ msgProtectedRoute: "", pathname }}
      ></Navigate>
    );
  }
  return <>{children}</>;
};

export default ProtectedRoute;
