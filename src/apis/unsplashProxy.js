import axios from "axios";

const unsplashProxy = axios.create({
	baseURL: 'https://meander-api.herokuapp.com'
})

export default unsplashProxy;