import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "./firebase.config";

const setUser = async (data) => {
  try {
    await addDoc(collection(db, "users"), data);
    return true;
  } catch (error) {
    return false;
  }
};

export default setUser;
