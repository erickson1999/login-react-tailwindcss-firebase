// packages
import React, { useState } from "react";
// react-router
import { Link } from "react-router-dom";
// helpers
import { helpSetDefaultUserFields } from "../helpers/helpSetDefaultUserFields";
// hooks
import { useAuth } from "../hooks/useAuth";
// components
import { Alert } from "../components/Alert";
import { Form } from "../components/Form";
import { SignInSocial } from "../components/SignInSocial";
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
export const Register = () => {
  const [errResponse, setErrResponse] = useState(null);
  const { signup } = useAuth();
  const submitRegister = (form) => {
    const { email, password } = form;
    signup(email, password)
      .then((res) => {
        const data = { email, role: "user", notes: [] };
        const uid = res.user.uid;
        helpSetDefaultUserFields(data, uid);
      })
      .catch((err) => {
        setErrResponse(customMessageError(err.code));
        const timeOut = setTimeout(() => {
          setErrResponse(null);
          clearTimeout(timeOut);
        }, 3000);
      });
  };

  return (
    <div className="max-w-ws m-auto w-full max-w-xs">
      <Form
        initForm={initForm}
        validationsForm={validationsForm}
        submit={submitRegister}
        submitText={"Crear cuenta"}
      ></Form>

      <span className="mb-3 mr-1 block text-right text-sm text-gray-500 hover:text-gray-600">
        <Link to="/login">¿Ya tienes una cuenta? ingresa aquí</Link>
      </span>
      {errResponse && <Alert messageErr={errResponse}></Alert>}
      <SignInSocial></SignInSocial>
    </div>
  );
};
