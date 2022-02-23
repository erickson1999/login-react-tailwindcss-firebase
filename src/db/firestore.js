import { app } from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";

export const firestore = getFirestore(app);
