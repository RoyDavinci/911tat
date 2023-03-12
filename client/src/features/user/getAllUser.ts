import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { publicRequest } from "../../api/client";
import {
	escortState,
	payloadErrorResponse,
} from "../../interfaces/userinterfaces";

export const initialState: escortState = {
	data: {
		message: "",
		success: true,
		allEscort: [],
	},
	message: "",
	status: "idle",
	error: {},
};

export const getUsers = createAsyncThunk("fetchall", async () => {
	try {
		const { data } = await publicRequest.get("/user");
		return data;
	} catch (error) {
		const err = error as AxiosError<payloadErrorResponse>;
		return { message: err.response?.data.message };
	}
});

export const allEscorts = createSlice({
	name: "create",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUsers.pending, (state, action) => {
			state.status = "idle";
		});
		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = "successful";
			state.message = "escort gotten";
		});
		builder.addCase(getUsers.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error;
		});
	},
});

export const allEscortReducer = allEscorts.reducer;
