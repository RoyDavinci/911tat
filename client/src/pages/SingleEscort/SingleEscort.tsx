import React, { useEffect, useState } from "react";
import { verified } from "../../interfaces/user";
import { useParams } from "react-router-dom";
import "./singleEscort.css";
import { items } from "../../helpers/data";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart } from "../../features/cart/cart";
import { Footer, Header } from "../../components";
import { Link } from "react-router-dom";

export const SingleEscort = () => {
	const [escort, setEscort] = useState<verified>();
	const dispatch = useAppDispatch();

	const { id } = useParams();
	const { data } = useAppSelector((state) => state.cart);

	useEffect(() => {
		const getElement = () => {
			const itemData = items.find((item) => item.id === Number(id));
			setEscort(itemData);
			dispatch(addToCart(itemData));
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
								<div className='itemMainContent'>
									<div>
										<i className='fa-solid fa-circle-chevron-left'></i>
									</div>
									<div>
										<img src={escort?.url} alt='' />
									</div>
									<div>
										<i className='fa-solid fa-circle-chevron-right'></i>
									</div>
								</div>
								<div className='swiper-thumbs'>
									<ul>
										<li>
											<img src={escort?.thumbnailUrl} alt='' />
										</li>
										<li>
											<img src={escort?.thumbnailUrl} alt='' />
										</li>
									</ul>
								</div>
								<div className='basic'>
									<h1>{escort?.title}</h1>
									<div className='details'>
										<span>Female</span>
										<div className='location'>
											<h2>
												<i className='fa-sharp fa-solid fa-map-location-dot'></i>
												Location
											</h2>
											<div className='address'>
												<p>Garki 1</p>
												<p>Abuja</p>
												<p>Nigeria</p>
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
											<span className='value'>curvy</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Build</span>
											<span className='value'>curvy</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Build</span>
											<span className='value'>curvy</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Build</span>
											<span className='value'>curvy</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Build</span>
											<span className='value'>curvy</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Build</span>
											<span className='value'>curvy</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Build</span>
											<span className='value'>curvy</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Build</span>
											<span className='value'>curvy</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Build</span>
											<span className='value'>curvy</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Build</span>
											<span className='value'>curvy</span>
										</div>
										<div className='field type-DROPDOWN'>
											<span className='name'>Build</span>
											<span className='value'>curvy</span>
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
											<img src={escort?.thumbnailUrl} alt='' />
										</div>
										<div className='data'>
											<a href='' className='name'>
												{escort?.title}
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
				{data.length > 0 && (
					<section className='home__recentlyViewed'>
						<div className='home__latestContainer'>
							<div id='recent-ads' className='home__blockContainer onhome'>
								<h2>You may also like</h2>
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
				{data.length > 0 && (
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
			<Footer />
		</div>
	);
};
