import axios from "axios";

//? Config Axios
const instane = axios.create({
	baseURL: "https://reqres.in/api/",
});

//? Interceptors Axios
instane.interceptors.response.use(
	(response) => {
		return response.data ? response.data : { statusCode: response.status };
	},
	(error) => {
		return error.response;
	}
);

export default instane;
