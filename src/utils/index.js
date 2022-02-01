const redirectUrl = encodeURIComponent("https://mohitb35.github.io/meander/auth");
const oauthAuthorizeUrl = "https://meander-api.herokuapp.com/oauth/authorize";
const responseType = "code";

export const generateAuthorizeUrl = () => {
	let queryStrings = 
	`redirect_uri=${redirectUrl}&response_type=${responseType}`;

	return `${oauthAuthorizeUrl}?${queryStrings}`;
}