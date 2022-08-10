import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export * from "./config";
export * from "./fetchers";
