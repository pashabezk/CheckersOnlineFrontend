import axios from "axios";
import {axiosInstance, getAxiosConfigWithToken} from "./Config";

// TODO delete
export const fetchHelloTest = () => {
	return axiosInstance.get(`test/hello`);
};

// регистрация
export const fetchRegistration = (login, password) => {
	return axiosInstance.post(`api/user`, {username: login, password});
};

// авторизация
export const fetchLogin = (login, password) => {
	return axiosInstance.post(`api/login`, {login, password});
};

// получение информации о пользователе по идентификатору
export const fetchUserDataById = (id) => {
	return axios.get(`api/user/${id}`, getAxiosConfigWithToken());
};