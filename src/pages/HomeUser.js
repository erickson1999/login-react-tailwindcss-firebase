import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
export const HomeUser = () => {
  const { state } = useAuth();
  const { user } = state;
  return (
    <div className="flex flex-col items-center">
      <span>Bienvenido {user.email}</span>
      <Link
        className="my-2 rounded bg-gray-500 py-1 px-2 font-bold text-white hover:bg-gray-700"
        to="/notes"
      >
        ir a mis notas
      </Link>
    </div>
  );
};
