import React from "react";
import { NavLink } from "react-router-dom";

const classNavLink = `cursor-pointer rounded bg-gray-500 py-1 px-2 text-xl text-white hover:bg-gray-600`;
export const LinkNav = ({ title = "", styles = "", path = "/" }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? ` ${classNavLink} ${styles} bg-black`
            : `${classNavLink} ${styles}`
        }
      >
        {title}
      </NavLink>
    </li>
  );
};
