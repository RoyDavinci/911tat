import React, { useEffect, useState } from "react";
import { ProfileHeader } from "../../components";
import { Aside } from "../../components/Mobile/Aside/Aside";
import "./main.css";
import { Outlet, useOutletContext } from "react-router-dom";
import { privateRequest } from "../../api/client";
import { singleUser, userItems } from "../../interfaces/user";
import { toast } from "react-toastify";
import { payloadErrorResponse } from "../../interfaces/userinterfaces";
type ContextType = { user: userItems | null };

export const Main = () => {
	const [user, setUser] = useState<userItems>();
	useEffect(() => {
		const getUser = async () => {
			try {
				const { data } = await privateRequest.get("/user/single-user");
				const response = data as singleUser;
				if (response.success) {
					setUser(response.user);
				}
			} catch (error) {
				const err = error as payloadErrorResponse;
				toast(err.message);
			}
		};
		getUser();
	}, []);
	return (
		<div>
			<div className=''>
				<ProfileHeader />
				<div className='grid__dashboard__itemContainer'>
					<div className='showHeader'>
						<Aside />
					</div>
					<div>
						<Outlet context={{ user }} />
					</div>
				</div>
			</div>
		</div>
	);
};

export function useUser() {
	return useOutletContext<ContextType>();
}
