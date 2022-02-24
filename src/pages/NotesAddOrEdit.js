/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Alert } from "../components/Alert";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
import { v4 as uidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
const validationsForm = (form) => {
  const errors = {};
  if (!form.title) {
    errors.title = "Ingrese un titulo";
  }
  if (!form.description) {
    errors.description = "Ingrese un descripción";
  }
  return errors;
};
let initForm = {
  title: "",
  description: "",
};
export const NotesAddOrEdit = () => {
  const { addNote, state, updateNote } = useAuth();
  const submit = (form) => {
    if (form.id) {
      updateNote(form, user.uid);
    } else {
      form.id = uidv4();
      addNote(form, user.uid);
    }
    navigate("/notes")
  };
  const { handleChange, handleSubmit, errors, handleBlur, form, setForm } =
    useForm(initForm, validationsForm, submit);
  const location = useLocation();
  const stateNote = location.state;
  const { pathname } = location;
  const titles = stateNote
    ? { component: "Editar", button: "guardar cambios" }
    : { component: "Crear", button: "Crear" };
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/notes/edit" && !stateNote) {
      navigate("/");
    }
    if (stateNote) {
      setForm(stateNote);
    }
  }, []);
  const { user } = state;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <section className="sm:h-5/6 h-3/5 w-4/5 rounded bg-white p-3 flex flex-col justify-around shadow-md sm:w-1/2">
        <h1 className=" flex sm:h-1 h-1/5 items-center justify-center text-center text-2xl font-bold">
          {titles.component} una Nota
        </h1>
        <form className="h-5/6 flex flex-col sm:justify-evenly justify-center" onSubmit={handleSubmit}>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            name="title"
            id="title"
            placeholder="titulo"
            className="mb-1 block w-full max-h-full rounded border-2 py-1 pl-1"
            value={form.title}
          />

          {errors.title && <Alert messageErr={errors.title}></Alert>}
          <textarea
            onBlur={handleBlur}
            onChange={handleChange}
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={form.description}
            placeholder="Escribe tu nota..."
            className="max-h-full w-full resize-none rounded border-2 py-1 pl-1"
          ></textarea>
          {errors.description && (
            <Alert messageErr={errors.description}></Alert>
          )}

          <input
            type="submit"
            className="mx-auto justify-self-end mt-2 block h-9 sm:w-1/2 w-4/5 cursor-pointer rounded bg-red-500 text-center text-2xl font-bold text-white shadow-xl hover:bg-red-600"
            value={titles.button}
          />
        </form>
      </section>
    </div>
  );
};
