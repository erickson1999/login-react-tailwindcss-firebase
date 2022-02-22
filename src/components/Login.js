/* eslint-disable react-hooks/exhaustive-deps */
// packages
import React, { useState } from "react";
// react-router
import { useNavigate, useLocation, Link } from "react-router-dom";
// icons
import { FcGoogle } from "react-icons/fc";
// hooks
import { useAuth } from "../hooks/useAuth";
// components
import { Form } from "./Form";
import { Alert } from "./Alert";
import { ForgotPassword } from "./ForgotPassword";
// validations
const validationsForm = (form) => {
  const errors = {};
  if (!form.email) {
    errors.email = "por favor, ingrese un correo";
  }
  if (!form.password) {
    errors.password = "por favor, ingrese una contraseña";
  }
  return errors;
};

// custom message errors
const customMessageError = (err) => {
  switch (err) {
    case "auth/invalid-email":
      return "Por favor, ingrese un email válido. :)";
    case "auth/email-already-in-use":
      return "El email ingresado ya está en uso por favor, ingresa otro.";
    case "auth/weak-password":
      return "la contraseña debe tener más de 6 caracteres, ingresa otra.";
    default:
      return err;
  }
};

// inits
const initForm = {
  email: "",
  password: "",
};
const Login = () => {
  const [errResponse, setErrResponse] = useState(null);
  const { login, loginWithGoogle } = useAuth();
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { msgProtectedRoute, pathname } = location.state || {
    msgProtectedRoute: "",
    pathname: "/",
  };

  const submitLogin = (form) => {
    const { email, password } = form;
    login(email, password)
      .then(() => {
        if (location) {
          navigate(pathname);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setErrResponse(customMessageError(err.code));
        // const timeOut = setTimeout(() => {
        //   setErrResponse(null);
        //   clearTimeout(timeOut);
        // }, 3000);
      });
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((res) => {
        navigate("/perfil");
      })
      .catch((err) => {});
  };

  return (
    <div className="m-auto w-full max-w-xs">
      <Form
        initForm={initForm}
        validationsForm={validationsForm}
        submit={submitLogin}
        components={{ forgotPassword: <ForgotPassword /> }}
      ></Form>

      <span className="mt-1 mb-3 mr-1 block text-right text-sm text-gray-500 hover:text-gray-800">
        <Link to="/register">¿No tienes una cuenta? registrate aquí</Link>
      </span>
      {errResponse && <Alert messageErr={errResponse}></Alert>}
      {msgProtectedRoute && <Alert messageErr={msgProtectedRoute} />}
      <span className="mb-4 block text-center text-gray-500">Ingresa con:</span>
      <div className="flex justify-center">
        <button className="text-4xl" onClick={handleGoogleSignIn}>
          <FcGoogle></FcGoogle>
        </button>
      </div>
    </div>
  );
};

export default Login;
