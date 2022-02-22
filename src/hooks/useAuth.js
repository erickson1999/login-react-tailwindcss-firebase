// context
import { useContext } from "react";
import authContext from "../context/authcontext/authContext";

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("there is not auth provider");
  return context;
};
