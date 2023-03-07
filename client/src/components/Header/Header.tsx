import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { IUser } from "../../interfaces/userinterfaces";

export const Header = () => {
	const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<IUser>();

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			const data = JSON.parse(user) as unknown as IUser;
			setUserInfo(data);
		} else {
			console.log("object");
		}
	}, []);

	return (
		<header className='headerContainer'>
			<nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800'>
				<div className=''>
					<div className='mobileHeader'>
						<a href='https://flowbite.com' className='flex items-center'>
							<img
								src='https://flowbite.com/docs/images/logo.svg'
								className='mr-3 h-6 sm:h-9'
								alt='Flowbite Logo'
							/>
							<span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
								Flowbite
							</span>
						</a>
						<div>
							{showMobileMenu ? (
								<i
									className='fa-solid fa-xmark'
									onClick={() => setShowMobileMenu(!showMobileMenu)}
								></i>
							) : (
								<i
									className='fa-solid fa-bars'
									onClick={() => setShowMobileMenu(!showMobileMenu)}
								></i>
							)}
						</div>
					</div>
				</div>
				<div className='bigScreenHeader lg:px-20'>
					<a href='https://flowbite.com' className='flex items-center'>
						<img
							src='https://flowbite.com/docs/images/logo.svg'
							className='mr-3 h-6 sm:h-9'
							alt='Flowbite Logo'
						/>
						<span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
							Flowbite
						</span>
					</a>
					<div>
						<ul>
							<li>
								<i className='fa-solid fa-message'></i>
								<Link to='#'>Mssages</Link>
							</li>
							<li>
								<i className='fa-solid fa-location-dot'></i>
								<Link to='#'>Location</Link>
							</li>
							<li>
								{userInfo?.profilePhoto ? (
									<div className='flex gap-2 p-2 items-center shadow-lg rounded-lg '>
										<img
											src={userInfo.profilePhoto}
											alt=''
											className='rounded-full w-12 h-12'
										/>
									</div>
								) : (
									<div>
										<i className='fa-solid fa-lock'></i>
										<Link to='/login'>SignIn/Register</Link>
									</div>
								)}
							</li>
							<li className='showCase'>
								<i className='fa-regular fa-square-plus'></i>
								<Link to='#'>ShowCase</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			{showMobileMenu && (
				<div className='mobileMenu'>
					<ul>
						<li>
							<i className='fa-solid fa-message'></i>
							<Link to='#'>Mssages</Link>
						</li>
						<li>
							<i className='fa-solid fa-location-dot'></i>
							<Link to='#'>Location</Link>
						</li>
						<li>
							{userInfo?.profilePhoto ? (
								<div>
									<i className='fa-solid fa-user'></i>
									<Link to='/profile'>Profile</Link>
								</div>
							) : (
								<div>
									<i className='fa-solid fa-lock'></i>
									<Link to='#'>SignIn/Register</Link>
								</div>
							)}
						</li>
					</ul>
				</div>
			)}
		</header>
	);
};
