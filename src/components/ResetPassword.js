import React, { useState } from "react";
// hooks
import { useForm } from "../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
// components
import { Alert } from "./Alert";
import { useNavigate } from "react-router-dom";

// validations
const validationsForm = (form) => {
  const errors = {};
  if (!form.email) {
    errors.email = "por favor, ingrese un correo";
  }
  return errors;
};

//   inits
const initForm = {
  email: "",
};

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const submit = (form) => {
    resetPassword(form.email)
      .then((res) => {
        setMessage("¡El correo de recuperación fue enviado exitosamente!");
        const timeOut = setTimeout(() => {
          navigate("/");
          clearTimeout(timeOut);
        },10000);
      })
      .catch((err) => {
        throw new Error({ err });
      });
  };
  const { resetPassword } = useAuth();
  const { form, errors, handleChange, handleSubmit, handleBlur } = useForm(
    initForm,
    validationsForm,
    submit
  );

  return (
    <div className="mx-auto flex sm:w-1/4 w-4/5 flex-col items-center justify-center">
      <form
        className="mb-1 w-full rounded bg-white px-8 py-7 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="mb-2 block text-base text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded border border-gray-400 py-1 pl-1"
            type="email"
            id="email"
            name="email"
            placeholder="youremail@example.com"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.email && <Alert messageErr={errors.email}></Alert>}

        <input
          className="m-auto block cursor-pointer rounded bg-gray-800 py-1 px-2 text-white duration-300 ease-in hover:bg-black hover:text-white"
          type="submit"
          value="Recuperar contraseña"
        />
      </form>
      {message && (
        <Alert
          messageErr={message}
          styleMessage="border-green-400 bg-green-100  text-green-800"
        ></Alert>
      )}
    </div>
  );
};
