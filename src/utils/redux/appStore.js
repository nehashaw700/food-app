import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import restaurantReducer from "./restaurantSlice";

const appStore = configureStore({
    // one single big reducer
    reducer:{
        cart: cartReducer,
        restaurant: restaurantReducer,
    }
})

export default appStore;
