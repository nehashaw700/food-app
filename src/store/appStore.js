import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import restaurantReducer from "../features/restaurant/restaurantSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    restaurant: restaurantReducer,
  },
});

export default appStore;
