import axios from "axios";
import {getAxiosConfigWithToken} from "./Config";

// получение списка игр
export const fetchGetGamesList = () => {
	return axios.get(`game/checker`, getAxiosConfigWithToken());
};

// получение данных об игре
export const fetchGameData = (gameID) => {
	return axios.get(`game/checker?gameID=${gameID}`, getAxiosConfigWithToken());
};

// отправка запроса на создание игры
export const fetchCreateGame = () => {
	return axios.post(`game/checker`, {}, getAxiosConfigWithToken());
};

// отправка запроса на подключение к игре
export const fetchConnectToGame = (gameId, userId) => {
	const body = {
		gameId: gameId,
		secondUserId: userId
	};
	return axios.post(`game/checker/${gameId}/connect`, body, getAxiosConfigWithToken());
};

// получение данных о расположении шашек на поле
export const fetchCheckersField = (gameId) => {
	return axios.get(`game/checker/${gameId}/fullInfo`, getAxiosConfigWithToken());
};

// получение доступных ходов для шашки
export const fetchAvailableFields = (gameId, position) => {
	return axios.get(`game/checker/${gameId}/step?position=${position}`, getAxiosConfigWithToken());
};

// отправка хода шашки
export const fetchCreateCheckerStep = (gameId, from, to) => {
	return axios.post(`game/checker/${gameId}/step`, {from, to}, getAxiosConfigWithToken());
};

// отправка капитуляции
export const fetchCapitulate = (gameId) => {
	return axios.post(`game/checker/${gameId}/capitulate`, {}, getAxiosConfigWithToken());
};