import React from "react";
import SearchSvg from "../../assets/undraw_team_re_0bfe.svg";
import "./hero.css";

export const Hero = () => {
	return (
		<div className='heroContainer'>
			<section className='body-font'>
				<div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
					<div className='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
						<h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium '>
							Before they sold out
							<br className='hidden lg:inline-block' />
							readymade gluten
						</h1>
						<p className='mb-8 leading-relaxed'>
							Copper mug try-hard pitchfork pour-over freegan heirloom neutra
							air plant cold-pressed tacos poke beard tote bag. Heirloom echo
							park mlkshk tote bag selvage hot chicken authentic tumeric
							truffaut hexagon try-hard chambray.
						</p>
						<div className='flex justify-center'>
							<form action=''>
								<div className='relative flex-grow w-full'>
									<input
										type='email'
										id='email'
										name='email'
										className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
									/>
									<button className='text-white w-full my-2 bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
										Search
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'>
						<img
							className='object-cover object-center rounded'
							alt='hero'
							src={SearchSvg}
						/>
					</div>
				</div>
			</section>
		</div>
	);
};
