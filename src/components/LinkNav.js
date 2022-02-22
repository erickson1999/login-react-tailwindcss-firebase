import React from "react";
import { Link } from "react-router-dom";
export const LinkNav = ({ title = "", styles = "", path = "/" }) => {
  return (
    <li
      className={`cursor-pointer rounded bg-gray-500 py-1 px-2 text-xl text-white hover:bg-slate-600 ${styles}`}
    >
      <Link to={path}>{title}</Link>
    </li>
  );
};
