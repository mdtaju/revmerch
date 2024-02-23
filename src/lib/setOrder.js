import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "./firebase.config";

const setOrder = async (data) => {
  try {
    await addDoc(collection(db, "orders"), data);
    return true;
  } catch (error) {
    return false;
  }
};

export default setOrder;
