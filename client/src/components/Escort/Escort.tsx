import React, { useEffect, useState } from "react";
import "./escort.css";
import { data } from "../../helpers/data";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { verified } from "../../interfaces/user";

export const Escort = () => {
	const [verifiedInfo, setVerifiedInfo] = useState<verified[]>([]);
	const [unVerifiedInfo, setUnVerifiedInfo] = useState<verified[]>([]);

	useEffect(() => {
		const setData = () => {
			let verifiedArray: verified[] = [];
			let unverifiedArray: verified[] = [];
			for (let i = 0; i < data.length; i++) {
				if (data[i].verified) {
					verifiedArray.push(data[i]);
				} else {
					unverifiedArray.push(data[i]);
				}
			}
			setVerifiedInfo(verifiedArray);
			setUnVerifiedInfo(unverifiedArray);
		};

		setData();
		return () => {
			console.log("data cleared");
		};
	}, []);

	return (
		<div className='escort__container'>
			<div className='featuredEscortContainer'>
				{verifiedInfo.map((item, index) => {
					return (
						<div key={index} className='escort__itemContainer'>
							<Link to={`/${item.id}`}>
								<div>
									<img src={item.url} alt='' />
									<p>{item.title}</p>
									<div></div>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
			<div className='otherEscortContainer'>
				{unVerifiedInfo.map((item, index) => {
					return (
						<div key={index} className='escort__itemContainer'>
							<Link to={`/${item.id}`}>
								<img src={item.url} alt='' />
								<p>{item.title}</p>
								<div></div>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};
