// packages
import React, { useState } from "react";

// react-router
import { useNavigate, Link } from "react-router-dom";
// icons
import { FcGoogle } from "react-icons/fc";
// hooks
import { useAuth } from "../hooks/useAuth";
// components
import { Alert } from "./Alert";
import { Form } from "./Form";
// validations
const validationsForm = (form) => {
  const errors = {};
  if (!form.email) {
    errors.email = "por favor, ingrese un correo";
  }

  if (!form.password) {
    errors.password = "por favor, ingrese una contraseña";
  } else if (form.password.length < 6) {
    errors.password = "la contraseña no puede tener menos de 6 carácteres";
  }
  return errors;
};

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
const Register = () => {
  const [errResponse, setErrResponse] = useState(null);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const submitRegister = (form) => {
    const { email, password } = form;
    signup(email, password)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        setErrResponse(customMessageError(err.code));
        const timeOut = setTimeout(() => {
          setErrResponse(null);
          clearTimeout(timeOut);
        }, 3000);
      });
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((res) => {
        navigate("/perfil");
      })
      .catch((err) => {
      });
  };

  return (
    <div className="max-w-ws m-auto w-full max-w-xs">
      <Form
        initForm={initForm}
        validationsForm={validationsForm}
        submit={submitRegister}
      ></Form>

      <span className="mb-3 block text-right text-sm text-gray-500 hover:text-gray-600 mr-1">
        <Link to="/login">¿Ya tienes una cuenta? ingresa aquí</Link>
      </span>
      {errResponse && <Alert messageErr={errResponse}></Alert>}
      <span className="mb-4 block text-center text-base text-gray-500">
        Ingresa con:
      </span>
      <div className="flex justify-center">
        <button className="text-4xl" onClick={handleGoogleSignIn}>
          <FcGoogle></FcGoogle>
        </button>
      </div>
    </div>
  );
};

export default Register;
