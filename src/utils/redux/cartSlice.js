import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        items: [],
    },

    // multiple small reducers
    // reducer function modifies the slice of the store
    reducers:{
        // addItems is action which is dispatched
        addItem: (state, action) =>{
            // mutating state here
            state.items.push(action.payload);
            console.log(state.items);
        },

        removeItem: (state, action) => {
            state.items.pop();
        }, 

        clearCart: (state) => {
            state.items.length = 0;
        }
    }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;



