import { createSlice } from "@reduxjs/toolkit";
import { userItems, verified } from "../../interfaces/user";

export interface AllCartInterface {
	cart: userItems[];
}

export const initialState: AllCartInterface = {
	cart: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			console.log(action.payload);
			let item = state.cart?.find(
				(data) => data.user_id === action.payload.user_id
			);
			if (item) return;
			state.cart?.push(action.payload);
		},
		removeFromCart: (state, action) => {
			let item = state.cart?.filter(
				(item) => item.user_id !== action.payload.user_id
			);
			state.cart = item;
		},
		clearCart: (state) => {
			state.cart = [];
		},
	},
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
