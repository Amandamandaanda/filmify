import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;

            const existingItem = state.cartItems.find((item) => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({
                    ...newItem,
                    quantity: 1,
                });
            }
        },
        removeItem: (state, action) => {
            const existingItem = state.cartItems.find((item) => item.id === action.payload
        );
        if (existingItem && existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        }
        },
    },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;