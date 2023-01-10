import axios from "axios";
import {getTokenFromCookie} from "../Cookie/AuthWithCookie";

const SERVER_BASE_URL = "https://home.ferrion.tech/"; // базовый url сервера

// для использования запросов без токена
export const axiosInstance = axios.create({
	baseURL: SERVER_BASE_URL,
	withCredentials: true
});

// получение конфигурации для отправки запросов с токеном
export const getAxiosConfigWithToken = () => {
	return {
		baseURL: SERVER_BASE_URL,
		withCredentials: true,
		headers: {
			Authorization: "Bearer " + getTokenFromCookie() // получение токена из куки и помещение его в заголовок авторизации
		}
	}
};