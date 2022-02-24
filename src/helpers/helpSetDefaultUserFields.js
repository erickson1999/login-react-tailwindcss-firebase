import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../db/firestore";
// inits
const initDataUser = { role: "user", notes: [], email: "" };
export const helpSetDefaultUserFields = (data = initDataUser, uid) => {
  console.log({ data, uid });
  const newUser = doc(firestore, "users/" + uid);
  setDoc(newUser, data)
    .then(() => {
      console.log("usuario creado");
    })
    .catch((err) => {
      console.err(err);
    });
};
