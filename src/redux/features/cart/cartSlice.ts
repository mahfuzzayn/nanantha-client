import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find(
                (item) => item.productId === action.payload.productId
            );
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(
                (item) => item.productId !== action.payload
            );
        },
        updateQuantity(
            state,
            action: PayloadAction<{ productId: string; quantity: number }>
        ) {
            const item = state.items.find(
                (item) => item.productId === action.payload.productId
            );
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
