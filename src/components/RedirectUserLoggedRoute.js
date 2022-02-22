import React from "react";
import { Navigate } from "react-router-dom";
// hooks
import { useAuth } from "../hooks/useAuth";
export const RedirectUserLoggedRoute = ({children,pathRedirect}) => {
  const { state, waitingForData } = useAuth();
  const { user } = state;
  if (waitingForData) {
    return <></>;
  }
  if(user) {
    return (
      <Navigate
        to={pathRedirect}
      ></Navigate>
    );
  }
  return <>{children}</>;
};


