import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchGPSData = async () => {
  try {
    const docRef = doc(db, "gpsData", "1"); // collection: gpsData, docId: 1
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No GPS data found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching GPS:", error);
  }
};