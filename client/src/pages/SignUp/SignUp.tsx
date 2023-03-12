import React, { BaseSyntheticEvent, ChangeEvent, useState } from "react";
import "./sugnUp.css";
import { AxiosError } from "axios";
import Asset from "../../assets/Anonymous-shadow-babe.svg";
import { payloadErrorResponse } from "../../interfaces/userinterfaces";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createUser } from "../../features/auth/login";
import "react-toastify/dist/ReactToastify.css";

export const SignUp = () => {
	const [userDetail, setUserDetail] = useState({
		email: "",
		password: "",
		city: "",
		country: "",
		phone: "",
		state: "",
		username: "",
	});

	const navigate = useNavigate();

	const onchange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserDetail({ ...userDetail, [name]: value });
	};

	const { data, status, error } = useAppSelector((state) => state.create);

	const dispatch = useAppDispatch();

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		try {
			if (status === "idle") {
				await dispatch(createUser({ ...userDetail }));
			}
			if (status === "successful") {
				toast("Account successfully created");
				navigate("/dashboard");
			}
			if (status === "failed") {
				toast(error.message);
			}
		} catch (error) {
			const err = error as AxiosError<payloadErrorResponse>;
			toast(err.response?.data.message);
		}
	};

	return (
		<div className=''>
			<ToastContainer />
			<section className='flex flex-col md:flex-row gap-6  md:h-screen  justify-between'>
				<div className='flex-1 items-center justify-center'>
					<img
						src={Asset}
						alt=''
						className='object-cover items-center justify-center'
					/>
				</div>
				<div className='flex-1 md:px-20 px-6'>
					<h2 className='mb-4 text-xl font-bold text-center text-gray-900 dark:text-white'>
						Become An Escort
					</h2>
					<form action='' autoComplete='off' onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor='username'
								className='block my-2 text-xl font-medium text-gray-900 dark:text-white'
							>
								User Name
							</label>
							<input
								type='text'
								name='username'
								id='username'
								placeholder='Type user name'
								required={true}
								value={userDetail.username}
								onChange={onchange}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							/>
						</div>
						<div className='w-full'>
							<label
								htmlFor='email'
								className='block my-2 text-xl font-medium text-gray-900 dark:text-white'
							>
								Email
							</label>
							<input
								type='text'
								name='email'
								id='email'
								placeholder='Email'
								required={true}
								value={userDetail.email}
								onChange={onchange}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							/>
						</div>
						<div className='w-full'>
							<label
								htmlFor='price'
								className='block my-2 text-xl font-medium text-gray-900 dark:text-white'
							>
								Phone (use +234 format)
							</label>
							<input
								type='number'
								name='phone'
								id='phone'
								placeholder='+23456789087'
								required={true}
								value={userDetail.phone}
								onChange={onchange}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							/>
						</div>
						<div>
							<label
								htmlFor='password'
								className='block my-2 text-xl font-medium text-gray-900 dark:text-white'
							>
								Password
							</label>
							<input
								type='text'
								name='password'
								id='password'
								placeholder='$password'
								required={true}
								value={userDetail.password}
								onChange={onchange}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							/>
						</div>
						<div>
							<label
								htmlFor='state'
								className='block my-2 text-xl font-medium text-gray-900 dark:text-white'
							>
								State
							</label>
							<input
								type='text'
								name='state'
								id='state'
								placeholder='state'
								value={userDetail.state}
								onChange={onchange}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							/>
						</div>
						<div>
							<label
								htmlFor='city'
								className='block my-2 text-xl font-medium text-gray-900 dark:text-white'
							>
								City
							</label>
							<input
								type='text'
								name='city'
								id='city'
								placeholder='city'
								value={userDetail.city}
								onChange={onchange}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							/>
						</div>
						<div>
							<label
								htmlFor='country'
								className='block my-2 text-xl font-medium text-gray-900 dark:text-white'
							>
								Country
							</label>
							<input
								type='text'
								name='country'
								id='country'
								placeholder='country'
								value={userDetail.country}
								onChange={onchange}
								className='bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							/>
						</div>
						<button
							type='submit'
							className=' px-2.5 py-2.5 mt-4 sm:mt-6 text-xl font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 w-full'
						>
							Sign Up
						</button>
					</form>
				</div>
			</section>
		</div>
	);
};
