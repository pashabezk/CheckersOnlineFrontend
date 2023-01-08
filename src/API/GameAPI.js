const GAME_STATUS_WHITE_TURN = "WHITE TURN";
const GAME_STATUS_BLACK_TURN = "BLACK TURN";
const GAME_STATUS_BLACK_WIN = "BLACK WIN";
const GAME_STATUS_WHITE_WIN = "WHITE WIN";
const GAME_STATUS_WAITING_FOR_OPPONENT = "WAITING FOR OPPONENT";

const games = [
	{
		id: 1,
		opponentId: 32,
		opponentLogin: "Adamant",
		playerColor: "BLACK",
		status: GAME_STATUS_WHITE_TURN
	}, {
		id: 2,
		opponentId: 12,
		opponentLogin: "terminat",
		playerColor: "WHITE",
		status: GAME_STATUS_WHITE_TURN
	}, {
		id: 6,
		opponentId: null,
		opponentLogin: null,
		playerColor: "WHITE",
		status: GAME_STATUS_WAITING_FOR_OPPONENT
	}, {
		id: 7,
		opponentId: 32,
		opponentLogin: "Adamant",
		playerColor: "WHITE",
		status: GAME_STATUS_BLACK_WIN
	}, {
		id: 9,
		opponentId: 44,
		opponentLogin: "dada",
		playerColor: "WHITE",
		status: GAME_STATUS_WHITE_WIN
	}
];

export function fetchGetGamesList() {
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve({data: games})
		}, 1000)
	);
}