import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../db/firestore";

export const helpSetRole = (data = { role: "user" }, uid) => {
  console.log({ data, uid });
  const newUser = doc(firestore, "users/" + uid);
  setDoc(newUser, data)
    .then(() => {
      console.log("usuario creado");
    })
    .catch((err) => {
        console.err(err)
    });
};
