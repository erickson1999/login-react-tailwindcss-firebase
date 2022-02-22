import React from "react";

export const Alert = ({
  messageErr,
  styleMessage = " border-red-400 bg-red-100 text-red-500 ",
}) => {
  return (
    <div className={`w-full my-2 rounded border-2 border-solid px-1 py-1 ${styleMessage}`}>
      <span className="sm:inline-black">{messageErr}</span>
    </div>
  );
};
