import React, { useEffect, useState } from "react";
import { IUser } from "../../../interfaces/userinterfaces";
import "./profileHeader.css";
import defaultImage from "../../../assets/icons8-user-64.png";
import { Link } from "react-router-dom";

export const MobileProfileHeader = () => {
	const [user, setUser] = useState<IUser>();

	useEffect(() => {
		const userDetail = localStorage.getItem("user");
		if (userDetail) {
			const userInfo = JSON.parse(userDetail) as unknown as IUser;
			setUser(userInfo);
		}
		userDetail && setUser(JSON.parse(userDetail));
	}, []);

	return (
		<div className='flex items-center profileHeader__container py-10'>
			<Link to='/update'>
				<div className=' profileHeader__img__container rounded-full w-20'>
					<img
						src={user?.profilePhoto ? user?.profilePhoto : defaultImage}
						alt=''
					/>
					<div className='icon--image'>
						<i className='fa-solid fa-image'></i>
					</div>
				</div>
			</Link>
			<div>
				<h1>Hi {user?.username}</h1>
				<p>Manage your listings subscriptions and profile</p>
			</div>
		</div>
	);
};
