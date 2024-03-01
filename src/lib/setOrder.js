import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "./firebase.config";

const setOrder = async (data) => {
  try {
    const docRes = await addDoc(collection(db, "orders"), data);
    return {
      id: docRes.id,
      ...data,
    };
  } catch (error) {
    return false;
  }
};

export default setOrder;
