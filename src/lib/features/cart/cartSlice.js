import { db } from "@/lib/firebase.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (uid) => {
    const q = query(collection(db, "cart"), where("user_id", "==", uid));
    const querySnapshot = await getDocs(q);
    let docs = [];
    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data(),
      };

      docs.push(data);
    });
    return docs;
  }
);

// remove cart item
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id) => {
    console.log(id);
    try {
      await deleteDoc(doc(db, "cart", id));
      return id;
    } catch (error) {
      return false;
    }
  }
);

// clear the cart
export const clearTheCart = createAsyncThunk(
  "cart/clearTheCart",
  async (IDs) => {
    return IDs.forEach(async (id) => {
      await deleteDoc(doc(db, "cart", id));
      return id;
    });
  }
);

// add to cart
export const addToCart = createAsyncThunk("cart/addToCart", async (data) => {
  try {
    const docRes = await addDoc(collection(db, "cart"), data);
    return {
      ...data,
      id: docRes.id,
    };
  } catch (error) {
    return false;
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartArray: [],
    cartTotal: 0,
    promotionApplied: false,
  },
  reducers: {
    quantityIncrement(state, action) {
      const arr = state.cartArray.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            total_price: (item.quantity + 1) * item.product_price,
          };
        } else {
          return item;
        }
      });
      const itemsTotal = arr.map((item) => {
        return item.quantity * item.product_price;
      });
      const grandTotal = itemsTotal.reduce(
        (total, currValue) => total + currValue,
        0
      );
      state.promotionApplied = false;
      state.cartArray = arr;
      state.cartTotal = grandTotal;
    },
    quantityDecrement(state, action) {
      const arr = state.cartArray.map((item) => {
        if (item.id === action.payload.id) {
          if (item.quantity === 1) {
            return item;
          } else {
            return {
              ...item,
              quantity: item.quantity - 1,
              total_price: (item.quantity - 1) * item.product_price,
            };
          }
        } else {
          return item;
        }
      });
      const itemsTotal = arr.map((item) => {
        return item.quantity * item.product_price;
      });
      const grandTotal = itemsTotal.reduce(
        (total, currValue) => total + currValue,
        0
      );
      state.promotionApplied = false;
      state.cartArray = arr;
      state.cartTotal = grandTotal;
    },
    addColor(state, action) {
      const { id, color } = action.payload;
      const index = state.cartArray.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.cartArray[index] = { ...state.cartArray[index], color };
      }
    },
    addSize(state, action) {
      const { id, size } = action.payload;
      const index = state.cartArray.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.cartArray[index] = { ...state.cartArray[index], size };
      }
    },
    promotionDiscount(state, action) {
      // bill - (bill * discount / 100)
      if (!state.promotionApplied) {
        const discountValue =
          state.cartTotal - (state.cartTotal * action.payload) / 100;
        state.cartTotal = Math.floor(discountValue);
        state.promotionApplied = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        const itemsTotal = action.payload.map((item) => {
          return item.quantity * item.product_price;
        });
        const grandTotal = itemsTotal.reduce(
          (total, currValue) => total + currValue,
          0
        );
        state.cartTotal = grandTotal;

        state.cartArray = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const updateArr = [...state.cartArray, action.payload];
        const itemsTotal = updateArr.map((item) => {
          return item.quantity * item.product_price;
        });
        const grandTotal = itemsTotal.reduce(
          (total, currValue) => total + currValue,
          0
        );
        state.cartTotal = grandTotal;
        state.promotionApplied = false;
        state.cartArray = updateArr;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const dueItems = state.cartArray.filter(
          (item) => item.id !== action.payload
        );
        const itemsTotal = dueItems.map((item) => {
          return item.quantity * item.product_price;
        });
        const grandTotal = itemsTotal.reduce(
          (total, currValue) => total + currValue,
          0
        );
        state.promotionApplied = false;
        state.cartTotal = grandTotal;
        state.cartArray = dueItems;
      })
      .addCase(clearTheCart.fulfilled, (state, action) => {
        state.cartArray = [];
        state.cartTotal = 0;
        state.promotionApplied = false;
      });
  },
});

export const {
  quantityIncrement,
  quantityDecrement,
  promotionDiscount,
  addColor,
  addSize,
} = cartSlice.actions;

export default cartSlice.reducer;
