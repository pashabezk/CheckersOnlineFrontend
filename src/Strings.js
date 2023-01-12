// game statuses from server
export const GAME_STATUS_INIT = "INIT";
export const GAME_STATUS_IN_PROCESS = "IN_PROCESS";
export const GAME_STATUS_FINISHED = "FINISHED";

// game statuses for game
export const GAME_STATUS_YOUR_TURN = "YOUR_TURN";
export const GAME_STATUS_OPPONENT_TURN = "OPPONENT_TURN";
export const GAME_STATUS_YOU_WIN = "YOU_WIN";
export const GAME_STATUS_OPPONENT_WIN = "OPPONENT_WIN";

// checker colors and types
export const CHECKER_COLOR_WHITE = "WHITE";
export const CHECKER_COLOR_BLACK = "BLACK";
export const CHECKER_TYPE_CHECKER = "CHECKER";
export const CHECKER_TYPE_QUEEN = "QUEEN";

// checker colors and types shortly
export const CHECKER_COLOR_SHORTLY_WHITE = "w";
export const CHECKER_COLOR_SHORTLY_BLACK = "b";
export const CHECKER_TYPE_SHORTLY_CHECKER = "C";
export const CHECKER_TYPE_SHORTLY_QUEEN = "Q";

// функция конвертации длинных свойств в короткие (для цветов и типов шашек)
export const convertFullParamsToShortly = (param) => {
	let result;
	switch (param) {
		case CHECKER_COLOR_WHITE:
			result = CHECKER_COLOR_SHORTLY_WHITE;
			break;
		case CHECKER_COLOR_BLACK:
			result = CHECKER_COLOR_SHORTLY_BLACK;
			break;
		case CHECKER_TYPE_CHECKER:
			result = CHECKER_TYPE_SHORTLY_CHECKER;
			break;
		case CHECKER_TYPE_QUEEN:
			result = CHECKER_TYPE_SHORTLY_QUEEN;
			break;
		default:
			result = "ERROR: cannot convert";
			break;
	}
	return result;
};