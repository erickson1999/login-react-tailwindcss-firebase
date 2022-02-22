import React from "react";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  return (
    <span className="my-1 mr-1 block cursor-pointer text-right text-sm text-gray-500 hover:text-gray-800">
      <Link to="/reset-password">¿Olvidaste tu contraseña?</Link>
    </span>
  );
};
