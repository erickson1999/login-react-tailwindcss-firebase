import { useEffect, useReducer, useState } from "react";
import authContext from "./authContext";
import { auth } from "../../db/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../db/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
// types
import {
  SET_USER,
  SET_NOTES,
  SET_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from "../../types/allDataUser";
// reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    case SET_NOTES:
      return { ...state, notes: payload };
    case SET_NOTE:
      return { ...state, notes: [...state.notes, payload] };
    case UPDATE_NOTE:
      return { ...state, notes: payload };
    case DELETE_NOTE:
      return { ...state, notes: payload };
    default:
      return state;
  }
};

// inits

const initNotes = null;
const initUser = null;
const initState = { user: initUser, notes: initNotes };

export const AuthProvider = ({ children }) => {
  // hooks
  const [state, dispatch] = useReducer(reducer, initState);
  const [waitingForData, setWaitingForData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch({ type: SET_USER, payload: currentUser });
      // getNotes
      if (currentUser) {
        const docRef = doc(firestore, "users", currentUser.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const notes = docSnap.data().notes;
            dispatch({ type: "SET_NOTES", payload: notes });
          } else {
            console.log("no se pudo traer los datos del usuario");
          }
        });
      }
      setWaitingForData(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const addNote = (data, uid) => {
    const docRef = doc(firestore, "users", uid);
    dispatch({ type: SET_NOTE, payload: data });
    updateDoc(docRef, { notes: [...state.notes, data] })
      .then((res) => {
        console.log("nota creada");
      })
      .catch(console.log("error al agregar notas AuthProvider.js 67"));
  };
  const updateNote = (data, uid) => {
    const docRef = doc(firestore, "users", uid);
    const tempNotes = state.notes.map((note) => {
      if (note.id === data.id) {
        return data;
      }
      return note;
    });
    dispatch({ type: UPDATE_NOTE, payload: tempNotes });
    updateDoc(docRef, { notes: tempNotes })
      .then((res) => {
        console.log("nota actualizada");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNote = (id, uid) => {
    const tempNotes = state.notes.filter((note) => note.id !== id);
    const docRef = doc(firestore, "users", uid);
    dispatch({ type: DELETE_NOTE, payload: tempNotes });
    updateDoc(docRef, { notes: [...tempNotes] })
      .then((res) => {
        console.log("nota eliminada");
      })
      .catch((err) => console.log(err));
  };

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
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
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
