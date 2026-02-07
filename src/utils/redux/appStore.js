import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"

const appStore = configureStore({
    // one single big reducer
    reducer:{
        cart: cartReducer,
    }
})

export default appStore;