import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

// helpers
import {
  changeFormatDay,
  changeFormatMonth,
} from "../helpers/helpChangeFormatDate";
import { Link } from "react-router-dom";

// inits
const initFechaCuenta = { day: "", dayNumber: null, month: "", year: null };

export const Perfil = () => {
  const { state, logout } = useAuth();
  const { user } = state;
  const [fechaCuenta, setFechaCuenta] = useState(initFechaCuenta);
  useEffect(() => {
    if (user) {
      const date = new Date(parseInt(user.metadata.createdAt));
      const day = changeFormatDay(date.getDay());
      const numberDay = date.getDate();
      const month = changeFormatMonth(date.getMonth());
      const year = date.getFullYear();
      setFechaCuenta({ day, numberDay, month, year });
    }
  }, [user]);

  return (
    <>
      {user && (
        <main className="font-raleway  flex h-full w-full items-center justify-center">
          <section className="flex h-1/2 w-4/5 flex-col justify-between rounded bg-white py-4 px-4 sm:w-1/4">
            <label className="block text-center text-xl font-semibold">
              {user.displayName || user.email}
            </label>
            {user.photoURL && (
              <figure className="mt-2 flex w-full justify-center">
                <img
                  referrerpolicy="no-referrer"
                  className="rounded-full object-cover"
                  src={user.photoURL}
                  alt={`foto de perfil del usuario ${
                    user.displayName || user.email
                  } `}
                />
              </figure>
            )}
            {user.email && (
              <div>
                <span className="block font-semibold">Email:</span>
                <p>{user.email}</p>
              </div>
            )}
            {user.metadata.createdAt && (
              <div>
                <span className="block font-semibold">Creación:</span>
                <p>{`${fechaCuenta.day} ${fechaCuenta.numberDay} de ${fechaCuenta.month} del ${fechaCuenta.year}`}</p>
              </div>
            )}

            <div className="mx-full mt-1 flex justify-evenly">
              <button
                onClick={logout}
                className="rounded bg-gray-500 py-1 px-2 text-white"
              >
                Cerra sesión
              </button>
              <Link to="/" className="rounded bg-gray-500 py-1 px-2 text-white">
                ir a inicio
              </Link>
            </div>
          </section>
        </main>
      )}
    </>
  );
};
