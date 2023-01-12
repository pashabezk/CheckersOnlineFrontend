import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {GAME_STATUS_INIT} from "../Strings";
import {fetchAvailableFields, fetchCapitulate, fetchCheckersField, fetchCreateCheckerStep, fetchGameData} from "../API/GameAPI";
import {reinterpretGameData} from "../Utils/Checkers";

const initialState = {
	gameId: null, // идентификатор игры

	gameData: null, // игровые данные
	isGameDataLoading: false, // флаг загрузки данных об игре
	gameDataError: null, // сообщение об ошибке при загрузке игровых данных

	selectedCheckerPosition: null, // позиция выбранной шашки в шашечной нотации
	availableFields: [], // поля доступные для хода, описываются в шашечной нотации a1, g8
	gameField: null, // игровое поле (массив с данными о шашках)
	isGameFieldLoading: false, // загрузка данных о поле
	gameFieldError: null, // текст ошибки при попытке загрузить игровое поле

	isCapitulating: false // индикатор загрузки запроса на капитуляцию
};

// получение данных об игре
export const tryGetGameDataAsync = createAsyncThunk(
	'game/tryGetGameData',
	async ({gameId, userId}) => {
		const response = await fetchGameData(gameId).catch(reason => reason.response);
		return {
			data: response.data,
			status: response.status,
			gameId,
			userId
		};
	}
);

// получение данных о расположении шашек на поле
export const tryGetCheckersFieldAsync = createAsyncThunk(
	'game/tryGetCheckersField',
	async ({gameId, userId}) => {
		const response = await fetchCheckersField(gameId).catch(reason => reason.response);
		return {
			data: response.data,
			status: response.status,
			userId
		};
	}
);

// получение доступных ходов для шашки
export const tryGetAvailableFieldsForCheckerAsync = createAsyncThunk(
	'game/tryGetAvailableFieldsForChecker',
	async ({gameId, position}) => {
		const response = await fetchAvailableFields(gameId, position).catch(reason => reason.response);
		return {
			data: response.data,
			status: response.status
		};
	}
);

// отправка хода шашки
export const tryCreateCheckerStepAsync = createAsyncThunk(
	'game/tryCreateCheckerStep',
	async ({gameId, from, to}) => {
		const response = await fetchCreateCheckerStep(gameId, from, to).catch(reason => reason.response);
		return {
			data: response.data,
			status: response.status
		};
	}
);

// запрос на капитуляцию (сдаться)
export const tryCapitulateAsync = createAsyncThunk(
	'game/tryCapitulate',
	async (gameId) => {
		const response = await fetchCapitulate(gameId).catch(reason => reason.response);
		return {
			data: response.data,
			status: response.status
		};
	}
);

export const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		setGameId: (state, action) => {
			state.gameId = action.payload;
		},
		// установка позиции выбранной шашки
		setSelectedCheckerPosition: (state, action) => {
			state.selectedCheckerPosition = action.payload;
		},
		// setCheckersField: (state, action)=>{
		// 	state.selectedCheckerPosition = action.payload;
		// }

		// TODO то что ниже - переписать или удалить (если сервер подключит доступные ходы, то редьюсер ниже не нужен)
		// установка полей, доступных для хода
		// setAvailableFields: (state, action) => {
		// 	state.availableFields = action.payload;
		// }
	},
	extraReducers: (builder) => {
		builder
			.addCase(tryGetGameDataAsync.pending, (state) => {
				state.isGameDataLoading = true;
				state.gameDataError = null;
				state.selectedCheckerPosition = null;
			})
			.addCase(tryGetGameDataAsync.fulfilled, (state, action) => {
				state.isGameDataLoading = false;
				state.gameField = null;
				switch (action.payload.status) {
					case 200: // удалось загрузить данные об игре
						const gameData = action.payload.data;
						if (gameData.length === 1) {
							if (gameData[0].status === GAME_STATUS_INIT) {
								state.gameDataError = "Соперник ещё не подключился";
								break;
							}
							state.gameData = reinterpretGameData(gameData[0], action.payload.userId);
						} else {
							state.gameDataError = "Не удалось загрузить игру с таким идентификатором";
						}
						break;
					default:
						state.gameDataError = "Не удалось загрузить данные";
						break;
				}
			})
			.addCase(tryGetGameDataAsync.rejected, (state) => {
				state.isGameDataLoading = false;
				state.gameDataError = "Не удалось загрузить данные";
			})
			.addCase(tryGetCheckersFieldAsync.pending, (state) => {
				state.isGameFieldLoading = true;
				state.gameFieldError = null;
			})
			.addCase(tryGetCheckersFieldAsync.fulfilled, (state, action) => {
				state.isGameFieldLoading = false;
				switch (action.payload.status) {
					case 200: // удалось загрузить поле с игрой
						state.gameField = action.payload.data.checkers;
						const gameData = action.payload.data.gameInfo;
						state.gameData = reinterpretGameData(gameData, action.payload.userId);
						break;
					default:
						state.gameFieldError = "Не удалось загрузить данные";
						break;
				}
			})
			.addCase(tryGetCheckersFieldAsync.rejected, (state) => {
				state.isGameFieldLoading = false;
				state.gameFieldError = "Не удалось загрузить данные";
			})
			.addCase(tryGetAvailableFieldsForCheckerAsync.pending, (state) => {
				state.isGameFieldLoading = true;
				state.gameFieldError = null;
				state.availableFields = [];
			})
			.addCase(tryGetAvailableFieldsForCheckerAsync.fulfilled, (state, action) => {
				state.isGameFieldLoading = false;
				switch (action.payload.status) {
					case 200: // удалось загрузить список доступных ходов для шашки
						state.availableFields = action.payload.data;
						break;
					default:
						state.gameFieldError = "Не удалось загрузить доступные ходы";
						break;
				}
			})
			.addCase(tryGetAvailableFieldsForCheckerAsync.rejected, (state) => {
				state.isGameFieldLoading = false;
				state.gameFieldError = "Не удалось загрузить доступные ходы";
			})
			.addCase(tryCreateCheckerStepAsync.pending, (state) => {
				state.isGameFieldLoading = true;
				state.gameFieldError = null;
				state.availableFields = [];
				state.gameField = null; // поле необходимо очистить, чтобы по завершению запроса приложение отправило новый запрос на получение данных о поле
			})
			.addCase(tryCreateCheckerStepAsync.fulfilled, (state, action) => {
				state.isGameFieldLoading = false;
				switch (action.payload.status) {
					case 204: // удалось сделать ход
						state.gameData = null; // если ход был удачным, необходимо обновить информацию об игре, чтобы подгрузился статус игры
						break;
					default:
						state.gameFieldError = "Не удалось сделать ход";
						break;
				}
			})
			.addCase(tryCreateCheckerStepAsync.rejected, (state) => {
				state.isGameFieldLoading = false;
				state.gameFieldError = "Не удалось сделать ход";
			})
			.addCase(tryCapitulateAsync.pending, (state) => {
				state.isCapitulating = true;
				state.gameFieldError = null;
				state.availableFields = [];
			})
			.addCase(tryCapitulateAsync.fulfilled, (state, action) => {
				state.isCapitulating = false;
				switch (action.payload.status) {
					case 200: // капитуляция удалась
						state.gameField = null; // поле необходимо очистить
						state.gameData = null; // необходимо обновить информацию об игре, чтобы подгрузился статус игры
						break;
					default:
						state.gameFieldError = "Не удалось сделать ход";
						break;
				}
			})
			.addCase(tryCapitulateAsync.rejected, (state) => {
				state.isCapitulating = false;
			});
	},
});

// actions
export const {setSelectedCheckerPosition, setGameId} = gameSlice.actions;

// selectors
export const selectGameId = (state) => state.game.gameId;
export const selectGameData = (state) => state.game.gameData;
export const selectGameField = (state) => state.game.gameField;
export const selectSelectedCheckerPosition = (state) => state.game.selectedCheckerPosition;
export const selectAvailableFields = (state) => state.game.availableFields;
export const selectIsGameDataLoading = (state) => state.game.isGameDataLoading;
export const selectGameDataError = (state) => state.game.gameDataError;
export const selectIsGameFieldLoading = (state) => state.game.isGameFieldLoading;
export const selectGameFieldError = (state) => state.game.gameFieldError;
export const selectIsCapitulating = (state) => state.game.isCapitulating;

export default gameSlice.reducer;