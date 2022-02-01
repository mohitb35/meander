const redirectUrl = encodeURIComponent("https://meander.vercel.app/auth");
const oauthAuthorizeUrl = "https://meander-api.herokuapp.com/oauth/authorize";
const responseType = "code";

export const generateAuthorizeUrl = () => {
	let queryStrings = 
	`redirect_uri=${redirectUrl}&response_type=${responseType}`;

	return `${oauthAuthorizeUrl}?${queryStrings}`;
}