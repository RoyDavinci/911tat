import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export const Footer = () => {
	return (
		<div className='footer__container'>
			<div>
				<h2>Are you an Escort looking for clients?</h2>
				<Link to='/signup'>Create An Account</Link>
			</div>
		</div>
	);
};
