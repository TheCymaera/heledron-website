import "./layout.css";
import "./skin.css";
import { fa5_brands_discord, fa5_brands_github, fa5_brands_instagram, fa5_brands_patreon, fa5_brands_redditAlien, fa5_brands_tiktok, fa5_brands_twitter, fa5_brands_youtube, fa5_solid_envelope, fa6_brands_bluesky } from "fontawesome-svgs";

const setHTML = (selector: string, html: string) => {
	const element = document.querySelector(selector);
	if (!element) return;
	element.innerHTML = html;
}

setHTML(".fa5_brands_twitter", fa5_brands_twitter);
setHTML(".fa5_brands_github", fa5_brands_github);
setHTML(".fa5_brands_redditAlien", fa5_brands_redditAlien);
setHTML(".fa5_brands_youtube", fa5_brands_youtube);
setHTML(".fa5_brands_discord", fa5_brands_discord);
setHTML(".fa5_brands_envelope", fa5_solid_envelope);
setHTML(".fa5_brands_patreon", fa5_brands_patreon);
setHTML(".fa5_brands_bluesky", fa6_brands_bluesky);
setHTML(".fa5_brands_instagram", fa5_brands_instagram);
setHTML(".fa5_brands_tiktok", fa5_brands_tiktok);

// if (matchMedia('(prefers-color-scheme: dark)').matches) {
// 	document.documentElement.dataset.theme = 'dark';
// }
