import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { helpSetDefaultUserFields } from "../helpers/helpSetDefaultUserFields";
export const SignInSocial = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, state } = useAuth();
  const { notes } = state;
  const handleGoogleSignIn = () => {
    loginWithGoogle().then((res) => {
      if (!notes) {
        const data = { role: "user", notes: [], email: res.user.email };
        helpSetDefaultUserFields(data, res.user.uid);
      }
      navigate("/");
    });
  };
  return (
    <>
      <span className="mb-4 block text-center text-base text-gray-500">
        Ingresa con:
      </span>
      <div className="flex justify-center">
        <button className="text-4xl" onClick={handleGoogleSignIn}>
          <FcGoogle></FcGoogle>
        </button>
      </div>
    </>
  );
};
