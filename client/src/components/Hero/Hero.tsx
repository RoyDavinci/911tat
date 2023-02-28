import React from "react";
import SearchSvg from "../../assets/undraw_web_search_re_efla.svg";
import "./hero.css";

export const Hero = () => {
	return (
		<div className='heroContainer'>
			<section>
				<article className='firstChild'>
					<h1>Looking For A Damsel?</h1>
					<form action=''>
						<input type='text' placeholder='enter keyword' />
						<button>Submit</button>
					</form>
					<div>
						<div></div>
					</div>
				</article>
				<article>
					<img src={SearchSvg} alt='' />
				</article>
			</section>
		</div>
	);
};
