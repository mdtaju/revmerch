import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase.config";

const getCartItems = async (uid) => {
  const q = query(collection(db, "cart"), where("user_id", "==", uid));
  const querySnapshot = await getDocs(q);
  let docs = [];
  querySnapshot.forEach((doc) => {
    docs.push(doc);
  });
  return docs;
};

export default getCartItems;
