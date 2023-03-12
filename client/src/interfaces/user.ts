import { payloadErrorResponse } from "./userinterfaces";

export interface verified {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
	verified: boolean;
}

export interface users {
	user_id: number;
	username: string;
	email: string;
	phone: string | null;
	profilePhoto: string | null;
	password: string;
	accountStatus: number;
	isVerified: boolean;
	subscription_id: number | null;
	adminId: number | null;
	descriptionId: number | null;
	role: Role;
	created_at: Date;
	updated_at: Date | null;
}

export interface description {
	escort_id: number;
	city: string | null;
	state: string | null;
	country: string | null;
	build: string | null;
	height: string | null;
	BustSize: string | null;
	orientation: string | null;
	anal: string | null;
	oralSex: string | null;
	condom: string | null;
	smoke: string | null;
	ethnicity: string | null;
	age: string | null;
	shortTimeRate: string | null;
	overNightRate: string | null;
	created_at: Date;
	updated_at: Date | null;
	gender: string | null;
}

export interface subscribtions {
	subscription_id: number;
	months: string;
	user_id: number;
	created_at: Date;
	updated_at: Date | null;
}

export interface admin {
	id: number;
	name: string;
	email: string;
	role: Role;
	createdAt: Date;
	updatedAt: Date | null;
}

export interface Images {
	imageId: number;
	images: string | null;
	userId: number;
	createdAt: Date;
	updatedAt: Date | null;
}

export interface transactions {
	transactionId: number;
	transaction_status: Status;
	phone: string | null;
	email: string;
	amount: string;
	payment_interface: string;
	biller_Reference: string;
	transaction_reference: string;
	userId: number;
	createdAt: Date;
	updatedAt: Date | null;
}

export interface userItems {
	user_id: number;
	username: string;
	email: string;
	phone: string | null;
	profilePhoto: string | null;
	password: string;
	accountStatus: number;
	isVerified: boolean;
	subscription_id: number | null;
	adminId: number | null;
	descriptionId: number | null;
	role: Role;
	created_at: Date;
	updated_at: Date | null;
	Images: Images[];
	description: description;
}

export interface singleUser {
	message: string;
	success: boolean;
	user: userItems;
}

export interface allUser {
	allEscort: userItems[];
}

export type Role = "Super_Admin" | "Admin" | "Escort";

export type Status = "pending" | "successful" | "failed";
