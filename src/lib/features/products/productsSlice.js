import { db } from "@/lib/firebase.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const allProducts = [];
    querySnapshot.forEach((doc) => {
      allProducts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return allProducts;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsArray: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsArray = action.payload;
    });
  },
});

export default productsSlice.reducer;
