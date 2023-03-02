import React, { useEffect, useState } from "react";
import { IUser } from "../../../interfaces/userinterfaces";
import "./header.css";
import defaultImage from "../../../assets/icons8-user-64.png";
import { Aside } from "../Aside/Aside";

export const MobileHeader = () => {
	const [user, setUser] = useState<IUser>();
	const [showSidebar, setShowSidebar] = useState(false);

	useEffect(() => {
		const userDetail = localStorage.getItem("user");
		if (userDetail) {
			const userInfo = JSON.parse(userDetail) as unknown as IUser;
			setUser(userInfo);
		}
		userDetail && setUser(JSON.parse(userDetail));
	}, []);

	return (
		<header className='mobile__headerContainer'>
			<nav>
				<div>
					{showSidebar ? (
						<i
							className='fa-solid fa-xmark mx-3 menu-bar'
							onClick={() => setShowSidebar(!showSidebar)}
						></i>
					) : (
						<i
							className='fa-solid fa-bars mx-3 menu-bar'
							onClick={() => setShowSidebar(!showSidebar)}
						></i>
					)}

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
				</div>
				<div>
					<i className='fa-solid fa-magnifying-glass mx-3'></i>
					<div className='header__useImage rounded-full'>
						<img
							src={user?.profilePhoto ? user.profilePhoto : defaultImage}
							className='mr-3  '
							alt='user image'
						/>
					</div>
					<i className='fa-solid fa-plus plus-add mx-3'></i>
				</div>
			</nav>
			{showSidebar && (
				<div className='aside'>
					<Aside />
				</div>
			)}
		</header>
	);
};
