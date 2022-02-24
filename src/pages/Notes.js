import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useAuth } from "../hooks/useAuth";
export const Notes = () => {
  const navigate = useNavigate();
  const { state, deleteNote } = useAuth();
  const { notes, user } = state;
  const handleUpdate = (note) => {
    navigate("/notes/edit", { state: note });
  };

  const handleDelete = (idNote) => {
    const resConfirm = window.confirm("¿Está seguro de eliminar esta nota?");
    if (resConfirm) {
      deleteNote(idNote, user.uid);
    }
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <section className="h-4/5 w-4/5 rounded bg-white p-3 shadow-md sm:w-1/2">
        <h1 className="my-2 text-center text-2xl font-bold">Mis notas</h1>
        <Link
          to="/notes/add"
          className="mx-auto block h-9 w-full rounded bg-green-400 text-center text-2xl font-bold text-white shadow-xl hover:bg-green-700 sm:w-2/5"
        >
          Agregar nota
        </Link>
        <section
          className={`border-box mt-6 grid h-4/5 grid-cols-1 gap-x-4  gap-y-2 overflow-y-auto  rounded bg-gray-300  p-2 sm:mt-2  sm:h-4/5 ${
            notes
              ? notes.length > 0
                ? "sm:grid-cols-2"
                : "sm:grid-cols-1"
              : "sm:grid-cols-1"
          }`}
        >
          {notes ? (
            notes.length > 0 ? (
              notes.map((note) => (
                <div
                  key={note.id}
                  className=" flex h-60  flex-col justify-between rounded bg-amber-100 p-4 sm:h-44 sm:px-3 sm:py-1"
                >
                  <div>
                    <h3 className="text-center text-base font-bold capitalize">
                      {note.title}
                    </h3>
                    <p>{note.description}</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 ">
                    <button
                      className="rounded bg-red-300 py-1 px-2 "
                      onClick={() => {
                        handleDelete(note.id);
                      }}
                    >
                      eliminar
                    </button>
                    <button
                      className="rounded bg-orange-300 py-1 px-2"
                      onClick={() => handleUpdate(note)}
                    >
                      actualizar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center">
                No tienes notas
              </div>
            )
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Loader></Loader>
            </div>
          )}
        </section>
      </section>
    </div>
  );
};
