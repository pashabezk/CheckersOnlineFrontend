import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://home.ferrion.tech/",
	withCredentials: true
});

// TODO delete
export const fetchLoginTest = () => {
	return axiosInstance.get(`test/hello`);
};

// регистрация
export const fetchRegistration = (login, password) => {
	return axiosInstance.post(`api/user`, {username: login, password});
};