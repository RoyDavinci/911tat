import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
	payloadErrorResponse,
	userSignUp,
	UserState,
} from "../../interfaces/userinterfaces";
import { publicRequest } from "../../api/client";

const initialState: UserState = {
	message: "",
	status: "idle",
	data: {
		success: false,
		token: "",
		user: {
			user_id: 0,
			email: "",
			password: "",
			username: "",
			accountStatus: 0,
			isVerified: false,
			phone: "",
			escort_id: null,
			created_at: new Date(),
			updated_at: null,
			client_id: null,
			subscription_id: null,
			adminId: null,
			profilePhoto: "",
			role: "",
		},
	},
	error: {},
};

export const createUser = createAsyncThunk(
	"subscribe",
	async (item: userSignUp, thunkAPI) => {
		try {
			const { data } = await publicRequest.post(
				"/user/register-as-escort",
				item
			);
			return data;
		} catch (error) {
			const err = error as AxiosError<payloadErrorResponse>;
			return thunkAPI.rejectWithValue({
				message: err.response?.data.message,
			});
		}
	}
);

export const create = createSlice({
	name: "create",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createUser.pending, (state, action) => {
			state.status = "idle";
		});
		builder.addCase(createUser.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = "successful";
			localStorage.setItem("token", state.data.token);
			localStorage.setItem("user911tat", JSON.stringify(state.data.user));
		});
		builder.addCase(createUser.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error;
		});
	},
});

export const createReducer = create.reducer;
