import axios from "axios";

const unsplash = axios.create({
	baseURL: 'https://api.unsplash.com'
})

export default unsplash;