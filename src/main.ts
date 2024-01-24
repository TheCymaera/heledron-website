import "./layout.css";
import "./skin.css";
import { fa5_brands_discord, fa5_brands_github, fa5_brands_patreon, fa5_brands_redditAlien, fa5_brands_twitter, fa5_brands_youtube, fa5_solid_envelope } from "fontawesome-svgs";

document.querySelector(".fa5_brands_twitter")!.innerHTML = fa5_brands_twitter;
document.querySelector(".fa5_brands_github")!.innerHTML = fa5_brands_github;
document.querySelector(".fa5_brands_redditAlien")!.innerHTML = fa5_brands_redditAlien;
document.querySelector(".fa5_brands_youtube")!.innerHTML = fa5_brands_youtube;
document.querySelector(".fa5_brands_discord")!.innerHTML = fa5_brands_discord;
document.querySelector(".fa5_brands_envelope")!.innerHTML = fa5_solid_envelope;
document.querySelector(".fa5_brands_patreon")!.innerHTML = fa5_brands_patreon;

// if (matchMedia('(prefers-color-scheme: dark)').matches) {
// 	document.documentElement.dataset.theme = 'dark';
// }
