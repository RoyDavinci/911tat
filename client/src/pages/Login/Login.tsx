import React, {
	BaseSyntheticEvent,
	ChangeEvent,
	useEffect,
	useState,
} from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginAdmin } from "../../features/auth/login";
import logging from "../../helpers/logging";
import axios from "axios";

export const Login = () => {
	const [userDetail, setUserDetail] = useState({ email: "", password: "" });
	const [error, setError] = useState<string>();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setUserDetail({ ...userDetail, [name]: value });
	};

	const { data, status } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		try {
			e.preventDefault();
			const { data } = await axios.post(
				"http://localhost:2900/api/v1/user/login",
				{ username: userDetail.email, password: userDetail.password }
			);
			console.log(data);
		} catch (error) {
			const err = error as string;
			logging.info(err);
		}
	};

	useEffect(() => {
		const userState = localStorage.getItem("user");
		userState && navigate("/dashboard");
	}, [data, navigate]);
	return (
		<div>
			<section className='bg-gray-50 dark:bg-gray-900'>
				<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
					<Link
						to='#'
						className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
					>
						<img
							className='w-8 h-8 mr-2'
							src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
							alt='logo'
						/>
						Flowbite
					</Link>
					<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
						<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
								Sign in to your account
							</h1>
							<form
								className='space-y-4 md:space-y-6'
								action='#'
								onSubmit={handleSubmit}
							>
								{error && (
									<div className='text-red-600 bg-white text-center rounded p-2	w-full'>
										<small>{error && error}</small>
									</div>
								)}

								<div>
									<label
										htmlFor='email'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Your email or phone
									</label>
									<input
										type='email'
										name='email'
										id='email'
										value={userDetail.email}
										onChange={onChange}
										className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2463EB] focus:border-[#2463EB] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										placeholder='name@company.com'
										required={true}
									/>
								</div>
								<div>
									<label
										htmlFor='password'
										className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
									>
										Password
									</label>
									<input
										type='password'
										name='password'
										id='password'
										value={userDetail.password}
										onChange={onChange}
										placeholder='••••••••'
										className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2463EB] focus:border-[#2463EB] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										required={true}
										autoComplete='new-password'
									/>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-start'>
										<div className='flex items-center h-5'>
											<input
												id='remember'
												aria-describedby='remember'
												type='checkbox'
												className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#2463EB] dark:ring-offset-gray-800'
												required={false}
											/>
										</div>
										<div className='ml-3 text-sm'>
											<label
												htmlFor='remember'
												className='text-gray-500 dark:text-gray-300'
											>
												Remember me
											</label>
										</div>
									</div>
									<Link
										to='#'
										className='text-sm font-medium text-[#2463EB] hover:underline dark:text-primary-500'
									>
										Forgot password?
									</Link>
								</div>
								<button
									type='submit'
									className='w-full text-white bg-[#2463EB] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2463EB] dark:hover:bg-primary-700 dark:focus:ring-primary-800'
								>
									Sign in
								</button>
								<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
									Don't have an account yet?{" "}
									<Link
										to='/signup'
										className='font-medium text-[#2463EB] hover:underline dark:text-primary-500'
									>
										Sign up
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
