import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "./firebase.config";

const checkUser = async (phone) => {
  const q = query(
    collection(db, "users"),
    where("phone", "==", phone),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  let docs = [];
  querySnapshot.forEach((doc) => {
    docs.push(doc);
  });
  if (docs.length === 1) {
    return true;
  } else {
    return false;
  }
};

export default checkUser;
