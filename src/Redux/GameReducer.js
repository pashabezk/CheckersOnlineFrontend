import {createSlice} from "@reduxjs/toolkit";
import {CHECKER_COLOR_BLACK} from "../Strings";

const gameFieldRandom = [
	{
		"color": "WHITE",
		"type": "CHECKER",
		"position": "a1"
	}, {
		"color": "BLACK",
		"type": "QUEEN",
		"position": "c1"
	}, {
		"color": "WHITE",
		"type": "CHECKER",
		"position": "e1"
	}, {
		"color": "WHITE",
		"type": "QUEEN",
		"position": "c3"
	}, {
		"color": "WHITE",
		"type": "CHECKER",
		"position": "g1"
	}, {
		"color": "WHITE",
		"type": "CHECKER",
		"position": "f2"
	}, {
		"color": "WHITE",
		"type": "QUEEN",
		"position": "e3"
	}, {
		"color": "WHITE",
		"type": "QUEEN",
		"position": "g7"
	}, {
		"color": "WHITE",
		"type": "QUEEN",
		"position": "d6"
	}, {
		"color": "WHITE",
		"type": "CHECKER",
		"position": "f8"
	}, {
		"color": "BLACK",
		"type": "QUEEN",
		"position": "b8"
	}, {
		"color": "BLACK",
		"type": "CHECKER",
		"position": "d8"
	}, {
		"color": "BLACK",
		"type": "QUEEN",
		"position": "f4"
	}, {
		"color": "BLACK",
		"type": "CHECKER",
		"position": "d4"
	}, {
		"color": "BLACK",
		"type": "CHECKER",
		"position": "c7"
	}, {
		"color": "BLACK",
		"type": "QUEEN",
		"position": "e7"
	}, {
		"color": "WHITE",
		"type": "CHECKER",
		"position": "b6"
	}, {
		"color": "BLACK",
		"type": "CHECKER",
		"position": "c5"
	}, {
		"color": "BLACK",
		"type": "CHECKER",
		"position": "d2"
	}
];

const gameFieldTestQueen = [
	{
		"color": "WHITE",
		"type": "QUEEN",
		"position": "d2"
	}, {
		"color": "WHITE",
		"type": "QUEEN",
		"position": "b2"
	}, {
		"color": "WHITE",
		"type": "QUEEN",
		"position": "b6"
	}, {
		"color": "WHITE",
		"type": "QUEEN",
		"position": "d8"
	}, {
		"color": "BLACK",
		"type": "QUEEN",
		"position": "d4"
	}, {
		"color": "BLACK",
		"type": "QUEEN",
		"position": "f6"
	}, {
		"color": "BLACK",
		"type": "QUEEN",
		"position": "h6"
	}, {
		"color": "BLACK",
		"type": "QUEEN",
		"position": "e3"
	}
];

const initialState = {
	// rivalId: null,
	playerColor: CHECKER_COLOR_BLACK, // цвет игрока (белый или черный)
	selectedCheckerPosition: null,
	availableFields: [], // поля доступные для хода, описываются в шашечной нотации a1, g8
	gameField: gameFieldRandom,
};

export const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		// установка позиции выбранной шашки
		setSelectedCheckerPosition: (state, action) => {
			state.selectedCheckerPosition = action.payload;
		},
		// установка полей, доступных для хода
		setAvailableFields: (state, action) => {
			state.availableFields = action.payload;
		}
	},
	extraReducers: (builder) => {
		// builder
		// 	.addCase(getInfoFromTokenAsync.pending, (state) => {
		// 		state.isAuthing = true;
		// 	})
		// 	.addCase(getInfoFromTokenAsync.fulfilled, (state, action) => {
		// 		state.isAuthing = false;
		// 		if (action.payload.error === 0) {
		// 			state.userId = action.payload.id;
		// 			state.login = action.payload.login;
		// 			state.error = null;
		// 		} else {
		// 			state.error = action.payload.errorMsg;
		// 		}
		// 	})
		// 	.addCase(tryLogOutAsync.rejected, (state) => {
		// 		state.isAuthing = false;
		// 	});
	},
});

// actions
export const {setSelectedCheckerPosition, setAvailableFields} = gameSlice.actions;

// selectors
export const selectGameField = (state) => state.game.gameField;
export const selectPlayerColor = (state) => state.game.playerColor;
export const selectSelectedCheckerPosition = (state) => state.game.selectedCheckerPosition;
export const selectAvailableFields = (state) => state.game.availableFields;

export default gameSlice.reducer;