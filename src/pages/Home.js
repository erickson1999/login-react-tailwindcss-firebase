import React from "react";
// components
import { Navbar } from "../components/Navbar";
// hooks
import { useAuth } from "../hooks/useAuth";

export const Home = () => {
  const { state,waitingForData } = useAuth();
  const { user } = state;
  if (waitingForData) {
    return <></>;
  }
  // hooks
  return (
    <div className="h-full w-full m-4">
      <Navbar></Navbar>
      <div className="m-auto h-full flex max-w-sm flex-col items-center justify-center">
        <h1 className="text-3xl font-black">Home Page</h1>
        {user && <span>Bienvenido {user.email}</span>}
      </div>
    </div>
  );
};

