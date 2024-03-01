import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/products/productsSlice";
import cartSlice from "./features/cart/cartSlice";
import promotionSlice from "./features/promotion/promotionSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    promotion: promotionSlice,
  },
});

export default store;
