import React from "react";
import "./bottomMenu.css";
import { Link } from "react-router-dom";

export const BottomMenu = () => {
	return (
		<div>
			<div>
				<nav className='mobile-nav'>
					<Link to='/' className='bloc-icon'>
						<div>
							<i className='fa-solid fa-house'></i>
							<p>Home</p>
						</div>
					</Link>
					<Link to='/' className='bloc-icon'>
						<div>
							<i className='fa-solid fa-message'></i>
							<p>Messages</p>
						</div>
					</Link>
					<Link to='/' className='bloc-icon'>
						<i className='fa-solid fa-plus plus-add'></i>
					</Link>
					<Link to='/' className='bloc-icon'>
						<div>
							<i className='fa-solid fa-star'></i>
							<p>Favourite</p>
						</div>
					</Link>
					<Link to='/dashboard' className='bloc-icon'>
						<div>
							<i className='fa-solid fa-user'></i>
							<p>Account</p>
						</div>
					</Link>
				</nav>
			</div>
		</div>
	);
};
