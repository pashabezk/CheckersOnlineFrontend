import axios from "axios";
import {axiosInstance, getAxiosConfigWithToken} from "./Config";

// TODO  delete
// const GAME_STATUS_WHITE_TURN = "WHITE TURN";
// const GAME_STATUS_BLACK_TURN = "BLACK TURN";
// const GAME_STATUS_BLACK_WIN = "BLACK WIN";
// const GAME_STATUS_WHITE_WIN = "WHITE WIN";
// const GAME_STATUS_WAITING_FOR_OPPONENT = "WAITING FOR OPPONENT";

const games = [
	{
		id: 3,
		firstUserColor: "WHITE",
		firstUserId: 1,
		firstUserLogin: "pashapasha",
		secondUserColor: "BLACK",
		status: "INIT"
	},
	{
		id: 4,
		firstUserColor: "WHITE",
		firstUserId: 1,
		firstUserLogin: "pashapasha",
		secondUserColor: "BLACK",
		status: "INIT"
	},
	{
		firstUserColor: "WHITE",
		firstUserId: 1,
		secondUserId: 4,
		firstUserLogin: "pashapasha",
		secondUserLogin: "lox",
		id: 5,
		secondUserColor: "BLACK",
		turnOf: "BLACK",
		status: "IN_PROCESS"
	},
	{
		id: 6,
		firstUserColor: "WHITE",
		firstUserId: 4,
		secondUserId: 1,
		secondUserLogin: "pashapasha",
		firstUserLogin: "lox",
		secondUserColor: "BLACK",
		turnOf: "BLACK",
		status: "IN_PROCESS"
	},

	// {
	// 	id: 1,
	// 	opponentId: 32,
	// 	opponentLogin: "Adamant",
	// 	playerColor: "BLACK",
	// 	status: GAME_STATUS_WHITE_TURN
	// }, {
	// 	id: 2,
	// 	opponentId: 12,
	// 	opponentLogin: "terminat",
	// 	playerColor: "WHITE",
	// 	status: GAME_STATUS_WHITE_TURN
	// }, {
	// 	id: 6,
	// 	opponentId: null,
	// 	opponentLogin: null,
	// 	playerColor: "WHITE",
	// 	status: GAME_STATUS_WAITING_FOR_OPPONENT
	// }, {
	// 	id: 7,
	// 	opponentId: 32,
	// 	opponentLogin: "Adamant",
	// 	playerColor: "WHITE",
	// 	status: GAME_STATUS_BLACK_WIN
	// }, {
	// 	id: 9,
	// 	opponentId: 44,
	// 	opponentLogin: "dada",
	// 	playerColor: "WHITE",
	// 	status: GAME_STATUS_WHITE_WIN
	// }
];

// export const fetchGetGamesList = () => {
// 	return new Promise((resolve) =>
// 		setTimeout(() => {
// 			resolve({data: games});
// 		}, 1000)
// 	);
// };

export const fetchGetGamesList = () => {
	return axios.get(`game/checker`, getAxiosConfigWithToken());
};

export const fetchCreateGame = () => {
	return axios.post(`game/checker`, {}, getAxiosConfigWithToken());
};

// export function fetchConnectToGame(id) {
// 	return new Promise((resolve) =>
// 		setTimeout(() => {
// 			const result = Math.random(); // рандом для вывода ошибки
// 			if (result < 0.5)
// 				resolve({data: {error: null, connectedGameId: id}});
// 			else
// 				resolve({data: {error: "Невозможно подключиться к игре с таким идентификатором"}});
// 		}, 1000)
// 	);
// };

export const fetchConnectToGame = (gameId, userId) => {
	const body = {
		gameId: gameId,
		secondUserId: userId
	};
	return axios.post(`game/checker/${gameId}/connect`, body, getAxiosConfigWithToken());
};