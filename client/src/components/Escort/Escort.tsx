import React, { useEffect, useState } from "react";
import "./escort.css";
import { data } from "../../helpers/data";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export interface verified {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
	verified: boolean;
}

export const Escort = () => {
	const [verifiedInfo, setVerifiedInfo] = useState<verified[]>([]);
	const [unVerifiedInfo, setUnVerifiedInfo] = useState<verified[]>([]);

	useEffect(() => {
		const setData = () => {
			for (let item = 0; item < data.length; item++) {}
			data.map((item) => {
				if (item.verified) {
					setVerifiedInfo((prev) => [...prev, item]);
				} else {
					setUnVerifiedInfo((prev) => [...prev, item]);
				}
			});
		};
		setData();
		return () => {
			console.log("data cleared");
		};
	}, []);

	console.log(verifiedInfo, unVerifiedInfo);

	return (
		<div>
			<div className='featuredEscortContainer'>
				<Carousel infiniteLoop>
					{verifiedInfo.map((item, index) => {
						return (
							<div key={index}>
								<div className='escort__itemContainer'>
									<img src={item.url} alt='' />
									<p>{item.title}</p>
									<div></div>
								</div>
							</div>
						);
					})}
				</Carousel>
			</div>
			<div className='otherEscortContainer'>
				{unVerifiedInfo.map((item, index) => {
					return (
						<div key={index} className='escort__itemContainer'>
							<img src={item.url} alt='' />
							<p>{item.title}</p>
							<div></div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
