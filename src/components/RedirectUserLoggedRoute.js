import React from "react";
import { Navigate } from "react-router-dom";
// hooks
import { useAuth } from "../hooks/useAuth";
export const RedirectUserLoggedRoute = ({children,pathRedirect}) => {
  const { state } = useAuth();
  const { user } = state;
  if(user) {
    return (
      <Navigate
        to={pathRedirect}
      ></Navigate>
    );
  }
  return <>{children}</>;
};


