import {CHECKER_COLOR_BLACK, CHECKER_COLOR_WHITE, GAME_STATUS_FINISHED, GAME_STATUS_IN_PROCESS, GAME_STATUS_OPPONENT_TURN, GAME_STATUS_OPPONENT_WIN, GAME_STATUS_YOU_WIN, GAME_STATUS_YOUR_TURN} from "../Strings";

// реинтерпретация данных, полученных с сервера
export const reinterpretGameData = (game, playerId) => {
	let newGame = {...game};
	if (game.status === GAME_STATUS_IN_PROCESS) {
		if (game.firstUserId === Number(playerId)) {
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
	if (game.status === GAME_STATUS_FINISHED) {
		if (game.firstUserId === Number(playerId)) {
			newGame.opponentLogin = game.secondUserLogin;
			newGame.opponentId = game.secondUserId;
		}
		else {
			newGame.opponentLogin = game.firstUserLogin;
			newGame.opponentId = game.firstUserId;
		}
		if (game.winnerId === Number(playerId)) {
			newGame.status = GAME_STATUS_YOU_WIN;
		}
		else
			newGame.status = GAME_STATUS_OPPONENT_WIN;
	}
	return newGame;
};