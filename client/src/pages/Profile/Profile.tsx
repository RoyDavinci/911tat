import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../main/Main";
import "./profile.css";

export const Profile = () => {
	const { user } = useUser();
	const [pending, setPending] = useState<number>();
	const [verified, setVerified] = useState<boolean | undefined>(
		() => user?.isVerified
	);

	useEffect(() => {
		if (!user?.description) {
			setPending(10);
		} else {
			let num = 0;
			Object.keys(user.description).map((item, index) => {
				num += index;
			});
		}
	}, []);

	return (
		<div>
			<div className='profile__detailContainer lg:px-6'>
				<Link to='/'>
					<div className='profile__detail__itemContainer'>
						<i className='fa-solid fa-person-circle-check'></i>
						<h1>Personal Details</h1>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
							quia nisi assumenda laboriosam natus.
						</p>
					</div>
				</Link>
				<Link to='/'>
					<div className='profile__detail__itemContainer'>
						<i className='fa-solid fa-check-double'></i>
						<h1>Published Profile</h1>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
							quia nisi assumenda laboriosam natus.
						</p>
					</div>
				</Link>
				<Link to='/verify'>
					<div className='profile__detail__itemContainer'>
						<div className={pending ? "flex justify-between items-center" : ""}>
							<i className='fa-solid fa-rotate-right'></i>
							<i className='fa-solid fa-check-double relative'>
								<span className='text-sm absolute top-0 text-red-100'>
									{pending}
								</span>
							</i>
						</div>
						<h1>Pending Validatioon</h1>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
							quia nisi assumenda laboriosam natus.
						</p>
					</div>
				</Link>
				<Link to='/'>
					<div className='profile__detail__itemContainer'>
						<i className='fa-solid fa-hourglass-start'></i>
						<h1>Expired Listings</h1>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
							quia nisi assumenda laboriosam natus.
						</p>
					</div>
				</Link>
				<Link to='/'>
					<div className='profile__detail__itemContainer'>
						<div
							className={!verified ? "flex justify-between items-center" : ""}
						>
							<i className='fa-solid fa-money-bill'></i>
							<i className='fa-solid fa-cart-shopping blink'></i>
						</div>
						<h1>Subscriptions Details</h1>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
							quia nisi assumenda laboriosam natus.
						</p>
					</div>
				</Link>
				<Link to='/'>
					<div className='profile__detail__itemContainer'>
						<i className='fa-solid fa-person-circle-check'></i>
						<h1>My Profile</h1>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
							quia nisi assumenda laboriosam natus.
						</p>
					</div>
				</Link>
				<Link to='/'>
					<div className='profile__detail__itemContainer'>
						<i className='fa-solid fa-person-circle-check'></i>
						<h1>Messages </h1>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
							quia nisi assumenda laboriosam natus.
						</p>
					</div>
				</Link>
			</div>
		</div>
	);
};
