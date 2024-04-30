import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: string,
    title: string,
    price: number,
    quantity: number
};

type CartState = {
    items: CartItem[]
};

const initialState: CartState = {
    items: []
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(
            state, 
            action: PayloadAction<{ id: string; title: string; price: number }>
        ) {
            const indexItem = state.items.findIndex(
                item => item.id === action.payload.id
            );

            if (indexItem >= 0) {
                state.items[indexItem].quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1});
            }
        },
        removeFromCart(
            state, 
            action: PayloadAction<string>
        ) {
            const indexItem = state.items.findIndex(
                item => item.id === action.payload
            );

            if (state.items[indexItem].quantity === 1) {
                state.items.splice(indexItem, 1);
            } else {
                state.items[indexItem].quantity--;
            }
        }
    }
});

export const { addToCart, removeFromCart } = CartSlice.actions;