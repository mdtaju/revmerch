import { db } from "@/lib/firebase.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

// fetch cart items
export const fetchPromotion = createAsyncThunk(
  "promotion/fetchPromotion",
  async (code) => {
    const q = query(
      collection(db, "promotions"),
      where("code", "==", code),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let docs = [];
    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data(),
      };

      docs.push(data);
    });
    if (docs.length === 0) {
      return {
        code: "",
        percent: 0,
      };
    } else {
      return {
        code: docs[0]?.code,
        percent: docs[0]?.percent,
      };
    }
  }
);

const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    promotionInfo: {
      code: "",
      percent: 0,
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPromotion.fulfilled, (state, action) => {
      state.promotionInfo = action.payload;
    });
  },
});

export default promotionSlice.reducer;
