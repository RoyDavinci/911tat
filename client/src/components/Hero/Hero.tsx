import React from "react";
import SearchSvg from "../../assets/undraw_web_search_re_efla.svg";

export const Hero = () => {
	return (
		<div>
			<section>
				<article>
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
