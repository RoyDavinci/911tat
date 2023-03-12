import { singleUser, userItems } from "./user";

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
	role: string;
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

export interface userPayloadResponse {
	message: string;
	success: boolean;
	user: userItems;
}

export type userSignUp = {
	country?: string;
	city?: string;
	state?: string;
	password: string;
	email: string;
	phone: string;
	username: string;
};

export interface UserState {
	message: string;
	status: "idle" | "loading" | "failed" | "successful";
	data: payloadResponse;
	error: payloadErrorResponse;
}

export interface escortPayloadResponse {
	message: string;
	success: boolean;
	allEscort: userItems[];
}
export interface SingleEscortPayloadResponse {
	message: string;
	success: boolean;
	user: userItems;
}

export interface escortState {
	message: string;
	status: "idle" | "loading" | "failed" | "successful";
	data: escortPayloadResponse;
	error: payloadErrorResponse;
}
export interface SingleEscortState {
	message: string;
	status: "idle" | "loading" | "failed" | "successful";
	data: SingleEscortPayloadResponse;
	error: payloadErrorResponse;
}
