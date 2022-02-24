import React from "react";
import { useAuth } from "../hooks/useAuth";
import { LoaderPage } from "./LoaderPage";
export const WaitingForData = ({ children }) => {
  const { waitingForData } = useAuth();
  if (waitingForData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoaderPage></LoaderPage>
      </div>
    );
  }
  return <>{children}</>;
};
