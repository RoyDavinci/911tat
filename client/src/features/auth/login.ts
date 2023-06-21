import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
	payloadErrorResponse,
	userInfo,
	userSignUp,
	UserState,
} from "../../interfaces/userinterfaces";
import { publicFormDataRequest, publicRequest } from "../../api/client";

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

export const loginAdmin = createAsyncThunk(
	"login",
	async (item: userInfo, thunkAPI) => {
		try {
			const { data } = await publicRequest.post("/user/login", item);
			return data;
		} catch (error) {
			const err = error as AxiosError<payloadErrorResponse>;
			return thunkAPI.rejectWithValue({ message: err.response?.data.message });
		}
	}
);

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

export const authSlice = createSlice({
	name: "login",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginAdmin.pending, (state) => {
			state.status = "idle";
		});
		builder.addCase(loginAdmin.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = "successful";
			localStorage.setItem("token", state.data.token);
			localStorage.setItem("user", JSON.stringify(state.data.user));
		});
		builder.addCase(loginAdmin.rejected, (state, action) => {
			state.error = action.error;
			state.status = "failed";
		});
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

export const authReducer = authSlice.reducer;
