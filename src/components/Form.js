import React from "react";

// Alert
import { Alert } from "./Alert";

// hooks
import { useForm } from "../hooks/useForm";
export const Form = ({
  initForm,
  validationsForm,
  submit,
  components = {},
  ...props
}) => {
  const { form, errors, handleChange, handleSubmit, handleBlur } = useForm(
    initForm,
    validationsForm,
    submit
  );

  return (
    <form
      className="mb-1 rounded bg-white px-8 py-7 shadow-md"
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

      <div className="mb-4">
        <label
          className="mb-2 block text-base text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full rounded border border-gray-400 py-1 pl-1"
          type="password"
          id="password"
          name="password"
          placeholder="*******"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {errors.password && <Alert messageErr={errors.password}></Alert>}
      {components.forgotPassword && components.forgotPassword}
      <input
        className="m-auto block cursor-pointer rounded bg-gray-800 py-1 px-2 text-white duration-300 ease-in hover:bg-black hover:text-white"
        type="submit"
        value="Ingresar"
      />
    </form>
  );
};
