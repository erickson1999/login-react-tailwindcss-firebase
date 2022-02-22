import React from "react";

import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <section className="gap- flex h-1/2 w-1/2 flex-col items-center justify-center gap-y-5 rounded bg-white">
        <span className="text-2xl font-bold">
          Upss parece que no existe la página que buscabas
        </span>

        <span className="rounded bg-gray-500 px-1 py-1 text-white">
          <Link to="/">Volver al inicio</Link>
        </span>
      </section>
    </div>
  );
};
