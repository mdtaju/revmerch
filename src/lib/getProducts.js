import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase.config";

const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const allProducts = [];
  querySnapshot.forEach((doc) => {
    allProducts.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return allProducts;
};

export default getProducts;
