import React from "react";
import "./header.css";

export const MobileHeader = () => {
	return (
		<header className='mobile__headerContainer'>
			<nav>
				<div>
					<i className='fa-solid fa-bars mx-3 menu-bar'></i>
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
					<img
						src='https://flowbite.com/docs/images/logo.svg'
						className='mr-3 h-6 sm:h-9'
						alt='Flowbite Logo'
					/>
					<i className='fa-solid fa-plus plus-add mx-3'></i>
				</div>
			</nav>
		</header>
	);
};
