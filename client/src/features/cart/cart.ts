import { createSlice } from "@reduxjs/toolkit";
import { verified } from "../../interfaces/user";

export interface AllCartInterface {
	data: verified[];
}

export const initialState: AllCartInterface = {
	data: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			let item = state.data.find((data) => data.id === action.payload.id);
			if (item) return;
			const items = { ...action.payload };
			state.data.push(items);
		},
		removeFromCart: (state, action) => {
			let item = state.data.filter((item) => item.id !== action.payload.id);
			state.data = item;
		},
		clearCart: (state) => {
			state.data = [];
		},
	},
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
