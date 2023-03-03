import React from "react";
import { Header } from "../../components";
import {
	BottomMenu,
	MobileHeader,
	ProfileHeader,
} from "../../components/Mobile";
import { Aside } from "../../components/Mobile/Aside/Aside";
import "./main.css";
import { Outlet } from "react-router-dom";

export const Main = () => {
	return (
		<div>
			<div className='mobileContainerr'>
				<MobileHeader />
				<div className='profile__Container'>
					<ProfileHeader />
					<div className='profile__detailContainer'>
						<div className='profile__detail__itemContainer'>
							<i className='fa-solid fa-person-circle-check'></i>
							<h1>Personal Details</h1>
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
								quia nisi assumenda laboriosam natus.
							</p>
						</div>
						<div className='profile__detail__itemContainer'>
							<i className='fa-solid fa-check-double'></i>
							<h1>Published Profile</h1>
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
								quia nisi assumenda laboriosam natus.
							</p>
						</div>
						<div className='profile__detail__itemContainer'>
							<i className='fa-solid fa-rotate-right'></i>
							<h1>Pending Validatioon</h1>
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
								quia nisi assumenda laboriosam natus.
							</p>
						</div>
						<div className='profile__detail__itemContainer'>
							<i className='fa-solid fa-hourglass-start'></i>
							<h1>Expired Listings</h1>
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
								quia nisi assumenda laboriosam natus.
							</p>
						</div>
						<div className='profile__detail__itemContainer'>
							<i className='fa-solid fa-money-bill'></i>
							<h1>Subscriptions Details</h1>
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
								quia nisi assumenda laboriosam natus.
							</p>
						</div>
						<div className='profile__detail__itemContainer'>
							<i className='fa-solid fa-person-circle-check'></i>
							<h1>My Profile</h1>
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
								quia nisi assumenda laboriosam natus.
							</p>
						</div>
						<div className='profile__detail__itemContainer'>
							<i className='fa-solid fa-person-circle-check'></i>
							<h1>Messages </h1>
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
								quia nisi assumenda laboriosam natus.
							</p>
						</div>
					</div>
				</div>
				<BottomMenu />
			</div>
			<div className='desktop__container'>
				<Header />
				<div className='grid__dashboard__itemContainer'>
					<div>
						<Aside />
					</div>
					<div>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};
