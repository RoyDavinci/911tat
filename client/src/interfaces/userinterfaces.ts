import { SerializedError } from "@reduxjs/toolkit";

export interface IUser {
	user_id: number;
	username: string;
	email: string;
	phone: string | null;
	password: string;
	accountStatus: number;
	isVerified: boolean;
	escort_id: number | null;
	client_id: number | null;
	subscription_id: number | null;
	adminId: number | null;
	created_at: Date;
	updated_at: Date | null;
	profilePhoto: string | null;
}
export interface payloadResponse {
	success: boolean;
	token: string;
	user: IUser;
}

export interface payloadErrorResponse {
	name?: string;
	message?: string;
	stack?: string;
	code?: string;
}

export type userInfo = {
	username: string;
	password: string;
};

export type userSignUp = {
	first_name: string;
	last_name: string;
	password: string;
	email: string;
	mobile: string;
	username: string;
	image: string | Blob;
};

export interface UserState {
	message: string;
	status: "idle" | "loading" | "failed" | "successful";
	data: payloadResponse;
	error: payloadErrorResponse;
}
