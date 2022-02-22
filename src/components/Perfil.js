import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

// helpers
import {
  changeFormatDay,
  changeFormatMonth,
} from "../helpers/helpChangeFormatDate";

// inits
const initFechaCuenta = { day: "", dayNumber: null, month: "", year: null };

const Perfil = () => {
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
          <section className="h-1/2 sm:w-1/4 w-full rounded bg-white py-4 px-4">
            <label className="block text-center text-xl font-semibold">
              {user.displayName || user.email}
            </label>
            {user.photoURL && (
              <figure className="mt-2 flex w-full justify-center">
                <img
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
            <div className="mx-full mt-5 flex justify-center">
              <button
                onClick={logout}
                className="rounded bg-gray-500 py-1 px-2 text-white"
              >
                Cerra sesión
              </button>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Perfil;
