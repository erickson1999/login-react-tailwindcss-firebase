// packages
import { useEffect, useReducer, useState } from "react";
// context
import authContext from "./authContext";
// auth
import { auth } from "../../db/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
// types
import { SET_USER } from "../../types/formTypes";
// reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};

// inits
const initUser = null;
const initState = { user: initUser };

export const AuthProvider = ({ children }) => {
  // hooks
  const [state, dispatch] = useReducer(reducer, initState);
  const [waitingForData, setWaitingForData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch({ type: SET_USER, payload: currentUser });
      setWaitingForData(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth,email)
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        logout,
        state,
        waitingForData,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
