import {CHECKER_COLOR_BLACK, CHECKER_COLOR_WHITE, GAME_STATUS_IN_PROCESS, GAME_STATUS_OPPONENT_TURN, GAME_STATUS_YOUR_TURN} from "../Strings";

// реинтерпретация данных, полученных с сервера
export const reinterpretGameData = (game, playerLogin) => {
	let newGame = {...game};
	if (game.status === GAME_STATUS_IN_PROCESS) {
		if (game.firstUserLogin === playerLogin) {
			newGame.playerColor = CHECKER_COLOR_WHITE;
			newGame.opponentLogin = game.secondUserLogin;
			newGame.opponentId = game.secondUserId;
			if (game.firstUserColor === game.turnOf) {
				newGame.status = GAME_STATUS_YOUR_TURN;
			} else {
				newGame.status = GAME_STATUS_OPPONENT_TURN;
			}
		} else {
			newGame.playerColor = CHECKER_COLOR_BLACK;
			newGame.opponentLogin = game.firstUserLogin;
			newGame.opponentId = game.firstUserId;
			if (game.secondUserColor === game.turnOf) {
				newGame.status = GAME_STATUS_YOUR_TURN;
			} else {
				newGame.status = GAME_STATUS_OPPONENT_TURN;
			}
		}
	}
	return newGame;
};