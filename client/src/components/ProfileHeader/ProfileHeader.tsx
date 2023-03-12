import React from "react";
import { Header } from "../Header/Header";
import { MobileHeader } from "../Mobile";
import "./profileHeader.css";
import { MobileProfileHeader } from "../Mobile/ProfileHeader/MobileProfileHeader";

export const ProfileHeader = () => {
	return (
		<div>
			<div className='showHeader'>
				<Header />
			</div>
			<div className='smallScreen'>
				<MobileHeader />
				<MobileProfileHeader />
			</div>
		</div>
	);
};
