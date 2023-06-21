import React, { useEffect, useState } from "react";
import "./escort.css";
import { items } from "../../helpers/data";
import { Link } from "react-router-dom";
import { allUser, userItems, verified } from "../../interfaces/user";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUsers } from "../../features/user/getAllUser";

export const Escort = () => {
	const [verifiedInfo, setVerifiedInfo] = useState<userItems[]>([]);
	const [unVerifiedInfo, setUnVerifiedInfo] = useState<userItems[]>([]);
	const [escort, setEscort] = useState<userItems[]>([]);
	const { cart } = useAppSelector((state) => state.cartItems);

	const { data, error, message, status } = useAppSelector(
		(state) => state.escort
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (status === "idle") {
			dispatch(getUsers());
		}
		if (status === "successful") {
			setEscort(data.allEscort);
			setVerifiedInfo(data.allEscort.slice(0, 10));
			setUnVerifiedInfo(data.allEscort.slice(10, data.allEscort.length));
		}
	}, [status, escort]);

	console.log(escort);

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
										<Link to={`/${item.user_id}`}>
											<div>
												<div className='img-wrap'>
													<img src={item.profilePhoto || ""} alt='' />
													<div className='user-image'>
														<img src={item.profilePhoto || ""} alt='' />
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
													<p>{item.username}</p>
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
			<section className='home__latest px-12 md:items-center place-items-center md:px-12'>
				<div className='home__latestContainer'>
					<div className='home__blockContainer'>
						<div className='otherEscortContainer products' id=''>
							{unVerifiedInfo.map((item, index) => {
								return (
									<div key={index} className='escort__itemContainer others'>
										<Link to={`/${item.user_id}`}>
											<div>
												<div className='img-wrap'>
													<img src={item?.profilePhoto || ""} alt='' />
													<div className='bar'>
														<div className='image-counter'>
															<i className='fa-solid fa-camera'></i>
															<span>5</span>
														</div>
													</div>
												</div>
												<p>{item.username}</p>
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
			{cart.length > 3 && (
				<section className='home__recentlyViewed sm:px-12'>
					<div className='home__latestContainer'>
						<div id='recent-ads' className='home__blockContainer onhome'>
							<h2>Recently Viewed</h2>
							<div
								className='featuredEscortContainer products'
								id='premium-items'
							>
								{cart.map((item, index) => {
									return (
										<div key={index} className='escort__itemContainer'>
											<div className='simple-wrap'>
												<Link to={`/${item.user_id}`}>
													<div>
														<div className='img-wrap'>
															<img src={item?.profilePhoto || ""} alt='' />
															<div className='user-image'>
																<img src={item?.profilePhoto || ""} alt='' />
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
															<p>{item.username}</p>
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
