import React, { useEffect, useState } from "react";
import "./escort.css";
import { items } from "../../helpers/data";
import { Link } from "react-router-dom";
import { verified } from "../../interfaces/user";
import { useAppSelector } from "../../app/hooks";

export const Escort = () => {
	const [verifiedInfo, setVerifiedInfo] = useState<verified[]>([]);
	const [unVerifiedInfo, setUnVerifiedInfo] = useState<verified[]>([]);
	const { data } = useAppSelector((state) => state.cart);

	useEffect(() => {
		const setData = () => {
			let verifiedArray: verified[] = [];
			let unverifiedArray: verified[] = [];
			for (let i = 0; i < items.length; i++) {
				if (items[i].verified) {
					verifiedArray.push(items[i]);
				} else {
					unverifiedArray.push(items[i]);
				}
			}
			setVerifiedInfo(verifiedArray);
			setUnVerifiedInfo(unverifiedArray);
		};

		setData();
		return () => {
			console.log("data cleared");
		};
	}, [data]);

	return (
		<div className='escort__container'>
			<section className='section__items__escortContainer'>
				<div className='container__items'>
					<h1>Featured Escorts</h1>
					<div className='featuredEscortContainer products' id='premium-items'>
						{verifiedInfo.map((item, index) => {
							return (
								<div key={index} className='escort__itemContainer'>
									<div className='simple-wrap'>
										<Link to={`/${item.id}`}>
											<div>
												<div className='img-wrap'>
													<img src={item.url} alt='' />
													<div className='user-image'>
														<img src={item.url} alt='' />
													</div>
													<div className='favorite'>
														<i className='fa-solid fa-star'></i>
													</div>
													<span className='premiumMark isGrid isDetail'>
														Verified
													</span>
													<div className='bar'>
														<div className='image-counter'>
															<i className='fa-solid fa-camera'></i>
															<span>5</span>
														</div>
													</div>
												</div>
												<div className='data'>
													<p>{item.title}</p>
													<p className='title__escort__titleItem'>SexWise</p>
													<p className='gender__escortGender'>Female</p>
												</div>
											</div>
										</Link>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
			<section className='home__latest'>
				<div className='home__latestContainer'>
					<div className='home__blockContainer'>
						<div className='otherEscortContainer products' id=''>
							{unVerifiedInfo.map((item, index) => {
								return (
									<div key={index} className='escort__itemContainer others'>
										<Link to={`/${item.id}`}>
											<div>
												<div className='img-wrap'>
													<img src={item.url} alt='' />
													<div className='bar'>
														<div className='image-counter'>
															<i className='fa-solid fa-camera'></i>
															<span>5</span>
														</div>
													</div>
												</div>
												<p>{item.title}</p>
												<div></div>
											</div>
										</Link>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>
			{data.length > 3 && (
				<section className='home__recentlyViewed'>
					<div className='home__latestContainer'>
						<div id='recent-ads' className='home__blockContainer onhome'>
							<h2>Recently Viewed</h2>
							<div
								className='featuredEscortContainer products'
								id='premium-items'
							>
								{data.map((item, index) => {
									return (
										<div key={index} className='escort__itemContainer'>
											<div className='simple-wrap'>
												<Link to={`/${item.id}`}>
													<div>
														<div className='img-wrap'>
															<img src={item.url} alt='' />
															<div className='user-image'>
																<img src={item.url} alt='' />
															</div>
															<div className='favorite'>
																<i className='fa-solid fa-star'></i>
															</div>
															<span className='premiumMark isGrid isDetail'>
																Verified
															</span>
															<div className='bar'>
																<div className='image-counter'>
																	<i className='fa-solid fa-camera'></i>
																	<span>5</span>
																</div>
															</div>
														</div>
														<div className='data'>
															<p>{item.title}</p>
															<p className='title__escort__titleItem'>
																SexWise
															</p>
															<p className='gender__escortGender'>Female</p>
														</div>
													</div>
												</Link>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</section>
			)}
		</div>
	);
};
