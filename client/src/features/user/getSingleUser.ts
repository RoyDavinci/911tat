import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { publicRequest } from "../../api/client";
import {
	escortState,
	payloadErrorResponse,
	SingleEscortState,
} from "../../interfaces/userinterfaces";

export const initialState: SingleEscortState = {
	data: {
		message: "",
		success: true,
		user: {
			user_id: 0,
			username: "",
			email: "",
			phone: "",
			profilePhoto: "",
			password: "",
			accountStatus: 0,
			isVerified: true,
			subscription_id: 0,
			adminId: 0,
			descriptionId: 0,
			role: "Escort",
			created_at: new Date(),
			updated_at: new Date(),
			Images: [],
			description: {
				escort_id: 0,
				city: "",
				state: "",
				country: "",
				build: "",
				height: "",
				BustSize: "",
				orientation: "",
				anal: "",
				oralSex: "",
				condom: "",
				smoke: "",
				ethnicity: "",
				age: "",
				shortTimeRate: "",
				overNightRate: "",
				created_at: new Date(),
				updated_at: new Date(),
				gender: "",
			},
		},
	},
	message: "",
	status: "idle",
	error: {},
};

export const getUser = createAsyncThunk(
	"subscribe",
	async (id: number, thunkAPI) => {
		try {
			const { data } = await publicRequest.get(`/user/${id}`);
			return data;
		} catch (error) {
			const err = error as AxiosError<payloadErrorResponse>;
			return thunkAPI.rejectWithValue({
				message: err.response?.data.message,
			});
		}
	}
);

export const singleEscort = createSlice({
	name: "create",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUser.pending, (state, action) => {
			state.status = "idle";
		});
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = "successful";
			state.message = "escort gotten";
		});
		builder.addCase(getUser.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error;
		});
	},
});

export const singleEscortReducer = singleEscort.reducer;
