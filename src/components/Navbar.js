import React from "react";
import { LinkNav } from "./LinkNav";
import { useAuth } from "../hooks/useAuth";
export const Navbar = () => {
  const { state } = useAuth();
  const { user } = state;
  return (
    <nav className="w-100 mt-4 flex flex-row justify-center ">
      <ul className="flex gap-x-2">
        <LinkNav title="Home" path="/" />
        {!user && <LinkNav title="Login" path="/login" />}
        {!user && <LinkNav title="Registro" path="/register" />}
        {user && <LinkNav title="Notas" path="/notes" />}
        {user && <LinkNav title="Perfil" path="/perfil" />}
      </ul>
    </nav>
  );
};
