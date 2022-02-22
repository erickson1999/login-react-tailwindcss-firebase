import React from "react";

// components
import { Navbar } from "./Navbar";
// hooks
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { state } = useAuth();
  const { user } = state;
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

export default Home;
