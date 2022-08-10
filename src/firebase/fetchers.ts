import { collection, Firestore, getDocs } from "firebase/firestore/lite";

export const getTime = async (db: Firestore) => {
  const timeCol = collection(db, "time");
  const timeSnapshot = await getDocs(timeCol);
  const timeList = timeSnapshot.docs.map((doc) => doc.data());
  return timeList;
};
