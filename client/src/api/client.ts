import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:2900/api/v1/";

const TOKEN = localStorage.getItem("token");

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const privateRequest = axios.create({
	baseURL: BASE_URL,
});

export const publicFormDataRequest = axios.create({
	baseURL: BASE_URL,
});

publicFormDataRequest.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		config.headers = config.headers ?? {};
		config.headers["Content-Type"] = "multipart/form-data";
		return config;
	},
	(error) => Promise.reject(error)
);

privateRequest.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		config.headers = config.headers ?? {};
		if (TOKEN) {
			config.headers.Authorization = `Bearer ${TOKEN}`;
			config.headers["Content-Type"] = "multipart/form-data";
		}
		return config;
	},
	(error) => Promise.reject(error)
);
