import React from "react";
import { LinkNav } from "./LinkNav";
export const Navbar = () => {
  return (
    <nav className="w-100 flex justify-center ">
      <ul className="flex gap-x-2">
        <LinkNav title="Login" path="/login" />
        <LinkNav title="Register" path="/register" />
        <LinkNav title="Perfil" path="/perfil" />
      </ul>
    </nav>
  );
};
