import React, { useEffect, useState } from "react";
import { userItems } from "../../interfaces/user";
import { useParams } from "react-router-dom";
import "./singleEscort.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart } from "../../features/cart/cart";
import { Footer, Header } from "../../components";
import { Link } from "react-router-dom";
import axios from "axios";
import { SingleEscortPayloadResponse } from "../../interfaces/userinterfaces";

export const SingleEscort = () => {
	const [escort, setEscort] = useState<userItems>();
	const [images, setImages] = useState<(string | null)[]>([""]);
	const [currentImage, setCurrentImage] = useState<number>(0);
	const dispatch = useAppDispatch();

	const { data, status } = useAppSelector((state) => state.singleEscort);

	const { id } = useParams();
	const { cart } = useAppSelector((state) => state.cartItems);

	const nextButton = () => {
		if (currentImage === images.length - 1) {
			setCurrentImage(0);
		} else {
			setCurrentImage((prev) => prev + 1);
		}
	};

	const prevButton = () => {
		if (currentImage === 0) {
			setCurrentImage(images.length - 1);
		} else {
			setCurrentImage((prev) => prev - 1);
		}
	};

	useEffect(() => {
		const getElement = async () => {
			const { data } = await axios.get(
				`http://localhost:2900/api/v1/user/${id}`
			);
			const response = data as SingleEscortPayloadResponse;
			if (response.success) {
				setEscort(response.user);
				console.log(response.user);
				dispatch(addToCart(response.user));
				let item: (string | null)[] = [];
				item.push(response.user.profilePhoto);
				response.user.Images.map((image) => {
					return item.push(image.images);
				});
				setImages(item);
			}
		};
		getElement();
	}, [id]);

	return (
		<div>
			<Header />
			<div className='container__item'>
				<div className='containerPrimary'>
					<div className='data-box'>
						<div className='item-main' id='item-main'>
							<div className='item-left'>
								<div className='itemMainContent flex items-center w-full'>
									<div>
										<i
											className='fa-solid fa-circle-chevron-left'
											onClick={prevButton}
										></i>
									</div>
									<div className=' basis-[100%]'>
										<img
											src={images[currentImage] || ""}
											alt=''
											className='lg:w-full'
											style={{}}
										/>
									</div>
									<div>
										<i
											className='fa-solid fa-circle-chevron-right'
											onClick={nextButton}
										></i>
									</div>
								</div>
								<div className='swiper-thumbs'>
									<ul>
										{escort?.Images?.map((item, index) => {
											return (
												<li key={index}>
													<img
														src={item.images || ""}
														alt=''
														className='object-cover h-20 w-20'
													/>
												</li>
											);
										})}
									</ul>
								</div>
								<div className='basic'>
									<h1>{escort?.username}</h1>
									<div className='details'>
										<span>Female</span>
										<div className='location'>
											<h2>
												<i className='fa-sharp fa-solid fa-map-location-dot'></i>
												Location
											</h2>
											<div className='address'>
												<p>{escort?.description?.city}</p>
												<p>{escort?.description?.state}</p>
												<p>{escort?.description?.country}</p>
											</div>
										</div>
									</div>
									<div className='favorites'>
										<i className='fa-regular fa-star'></i>
									</div>
								</div>
								<div className='props style'>
									<h2>Escort Brief</h2>
									<div className='custom-fields'>
										<div className='field type-DROPDOWN'>
											<span className='name'>Build</span>
											<span className='value'>curvy</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Build</span>
											<span className='value'>
												{escort?.description?.build}
											</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Anal</span>
											<span className='value'>{escort?.description?.anal}</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Age</span>
											<span className='value'>{escort?.description?.age}</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Condom</span>
											<span className='value'>
												{escort?.description?.condom}
											</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>ShortTime</span>
											<span className='value'>
												{escort?.description?.shortTimeRate}
											</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Overnight</span>
											<span className='value'>
												{escort?.description?.overNightRate}
											</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>BustSize</span>
											<span className='value'>
												{escort?.description?.BustSize}
											</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Orientation</span>
											<span className='value'>
												{escort?.description?.orientation}
											</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Smoke</span>
											<span className='value'>
												{escort?.description?.smoke}
											</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Gender</span>
											<span className='value'>
												{escort?.description?.gender}
											</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Height</span>
											<span className='value'>
												{escort?.description?.height}
											</span>
										</div>
									</div>
									<div className='item-hook'>
										<button className='wac-box'>
											<div className='wac-icon'>
												<i className='fa-brands fa-whatsapp'></i>
											</div>
											<div className='wac-text'>
												<p>Chat Escort on whatsapp</p>
											</div>
										</button>
									</div>
								</div>
								<div className='description'>
									<h2>About Me</h2>
									<div className='desc-parts'>
										<div className='desc-text'>
											<div className='text visible'>
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Alias nihil repudiandae ipsum perspiciatis mollitia
												animi similique in necessitatibus unde ea!
											</div>
										</div>
									</div>
								</div>
								<div id='comments'>
									<h2>Reviews</h2>
									<div className='wrap'>
										<div className='empty-comments'>
											No reviews has been added yet
										</div>
										<button className='open-form add btn-button'>
											Add a Review
										</button>
									</div>
								</div>
								<div id='shortcuts'>
									<a href='' className='print'>
										<i className='fa-solid fa-print'></i>
										Print
									</a>
									<a href=''>
										<i className='fa-solid fa-share'></i>
										Send To A Friend
									</a>
									<div className='item-share'>
										<a href=''>
											<i className='fa-brands fa-whatsapp'></i>
										</a>
										<a href=''>
											<i className='fa-brands fa-facebook-f'></i>
										</a>
										<a href=''>
											<i className='fa-brands fa-twitter'></i>
										</a>
										<a href=''>
											<i className='fa-brands fa-pinterest'></i>
										</a>
									</div>
								</div>
							</div>
							<div className='item-right' id='item-side'>
								<div className='master-button phone masked'>
									<i className='fa-solid fa-phone'></i>
									<span>0907458xxxx</span>
								</div>
								<div className='master-button contact masked'>
									<i className='fa-solid fa-message'></i>
									<span>Send Message</span>
								</div>
								<div className='boxed' id='seller'>
									<div className='line1'>
										<div className='img'>
											<img src={escort?.profilePhoto || ""} alt='' />
										</div>
										<div className='data'>
											<a href='' className='name'>
												{escort?.username}
											</a>
										</div>
									</div>
									<div className='line2'>
										<p>Last Online two weeks ago</p>
									</div>
									<div className='line3'>
										<a href='' className='phone masked '>
											<i className='fa-solid fa-phone'></i>
											<span>0907458xxxx</span>
										</a>
									</div>
								</div>
								<div className='boxed' id='protection'>
									<h2>Be Careful</h2>
									<div className='point'>
										<div className='icon'>
											<i className='fa-solid fa-credit-card'></i>
										</div>
										<span>
											Lorem ipsum dolor sit amet consectetur, adipisicing elit.
											Nihil, porro.
										</span>
									</div>
									<div className='point'>
										<div className='icon'>
											<i className='fa-solid fa-cash-register'></i>
										</div>
										<span>
											Lorem ipsum dolor sit amet consectetur, adipisicing elit.
											Nihil, porro.
										</span>
									</div>
									<div className='point'>
										<div className='icon'>
											<i className='fa-solid fa-user-secret'></i>
										</div>
										<span>
											Lorem ipsum dolor sit amet consectetur, adipisicing elit.
											Nihil, porro.
										</span>
									</div>
								</div>
								<div className='report-button'>
									<i className='fa-solid fa-flag'></i>
									<span>Report Escort</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* {cart.length > 3 && (
					<section className='home__recentlyViewed'>
						<div className='home__latestContainer'>
							<div id='recent-ads' className='home__blockContainer onhome'>
								<h2>You may also like</h2>
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
				)} */}
				{cart.length > 3 && (
					<section className='home__recentlyViewed'>
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
			<Footer />
		</div>
	);
};
