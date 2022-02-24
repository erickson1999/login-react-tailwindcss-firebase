import React from "react";

// hooks
import { useAuth } from "../hooks/useAuth";
import { HomeUser } from "./HomeUser";
import { HomeGuest } from "./HomeGuest";
export const Home = () => {
  const { state } = useAuth();
  const { user } = state;

  // hooks
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="m-auto flex h-full max-w-sm flex-col items-center justify-center">
        <h1 className="text-3xl font-black">Notes app</h1>
        {user ? <HomeUser /> : <HomeGuest />}
      </div>
    </div>
  );
};
