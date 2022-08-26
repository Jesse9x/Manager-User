import axios from "./AxiosConfig";

//TODO : Get Data API
export const getData = (page) => {
	return axios.get(`users?page=${page}`);
};

//TODO : Post Data API
export const postData = (name, job) => {
	return axios.post("users", { name, job });
};

//TODO : Put Data API
export const putData = (name, job) => {
	return axios.put("users/2", { name, job });
};

//TODO : Delete Data API
export const deleteData = (id) => {
	return axios.delete(`users/${id}`);
};

//TODO : Login API
export const loginData = (email, password) => {
	return axios.post("login", { email, password });
};
