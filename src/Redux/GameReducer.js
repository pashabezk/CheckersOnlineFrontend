import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {GAME_STATUS_INIT} from "../Strings";
import {fetchAvailableFields, fetchCheckersField, fetchCreateCheckerStep, fetchGetGamesList} from "../API/GameAPI";
import {reinterpretGameData} from "../Utils/Checkers";

const initialState = {
	gameId: null, // идентификатор игры

	gameData: null, // игровые данные
	isGameDataLoading: false, // флаг загрузки данных об игре
	gameDataError: null, // сообщение об ошибке при загрузке игровых данных

	selectedCheckerPosition: null,
	availableFields: [], // поля доступные для хода, описываются в шашечной нотации a1, g8
	gameField: null,
	isGameFieldLoading: false, // загрузка данных о поле
	gameFieldError: null
};

// получение данных об игре
export const tryGetGameDataAsync = createAsyncThunk(
	'game/tryGetGameData',
	async ({gameId, userLogin}) => {
		const response = await fetchGetGamesList().catch(reason => reason.response);
		return {
			data: response.data,
			status: response.status,
			gameId,
			userLogin
		};
	}
);

// получение данных о расположении шашек на поле
export const tryGetCheckersFieldAsync = createAsyncThunk(
	'game/tryGetCheckersField',
	async (gameId) => {
		const response = await fetchCheckersField(gameId).catch(reason => reason.response);
		return {
			data: response.data,
			status: response.status
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

						// на данный момент сервер выдает данные обо всех играх, поэтому нужно получить нужную
						const gameData = action.payload.data.filter(game => game.id === Number(action.payload.gameId));
						if (gameData.length === 1) {
							if (gameData[0].status === GAME_STATUS_INIT) {
								state.gameDataError = "Соперник ещё не подключился";
								break;
							}
							const reinterpretData = reinterpretGameData(gameData[0], action.payload.userLogin);
							console.log(reinterpretData)
							state.gameData = reinterpretData;
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
						state.gameField = action.payload.data;
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
				console.log(action.payload)
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

export default gameSlice.reducer;