import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchConnectToGame, fetchCreateGame, fetchGetGamesList} from "../API/GameAPI";

const initialState = {
	games: null, // [] // список игр в профиле
	isGamesListLoading: false, // флаг загрузки списка игр в профиле
	gamesListError: null, // сообщение об ошибке при получении данных // TODO не обработано

	// работа с модальным окном для создания новой игры
	isCreateGameModalOpen: false, // флаг отображения модульного окна создания новой игры
	isCreateGameLoading: false, // флаг запроса на создание новой игры
	createdGameId: null, // идентификатор созданной игры

	// работа с модальным окном для подключения к игре
	isConnectGameModalOpen: false, // флаг отображения модульного окна подключения к игре
	isConnectGameLoading: false, // флаг запроса на подключение к игре
	connectedGameId: null, // идентификатор игры, к которой подключается пользователь
	connectGameError: null // string, ошибка о подключении к игре
};

// получение списка игр
export const tryGetGamesListAsync = createAsyncThunk(
	'profile/getGamesList',
	async () => {
		const response = await fetchGetGamesList().catch(reason => reason.response);
		return {
			data: response.data,
			status: response.status
		};
	}
);

// запрос на создание игры
export const tryCreateNewGameAsync = createAsyncThunk(
	'profile/createNewGame',
	async () => {
		const response = await fetchCreateGame().catch(reason => reason.response);
		return {
			data: response.data,
			status: response.status
		};
	}
);

// запрос на подключение к игре
export const tryConnectToGameAsync = createAsyncThunk(
	'profile/connectToGame',
	async ({gameId, userId}) => {
		const response = await fetchConnectToGame(gameId, userId).catch(reason => reason.response);
		return {
			data: response.data,
			status: response.status
		};
	}
);

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setInitialState: (state, action) => {
			for (let key in initialState ) {
				state[key] = initialState[key];
			}
		},
		setGamesList: (state, action) => {
			state.games = action.payload;
		},
		setIsCreateGameModalOpen: (state, action) => {
			if (action.payload) {
				state.isCreateGameModalOpen = true;
			} else {
				state.createdGameId = null;
				state.isCreateGameModalOpen = false;
			}
		},
		setIsConnectGameModalOpen: (state, action) => {
			if (action.payload) {
				state.isConnectGameModalOpen = true;
				state.connectedGameId = null;
				state.connectGameError = null;
			} else {
				state.isConnectGameModalOpen = false;
				state.connectGameError = null;
				state.connectedGameId = null;
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(tryGetGamesListAsync.pending, (state) => {
				state.isGamesListLoading = true;
				state.gamesListError = null;
			})
			.addCase(tryGetGamesListAsync.fulfilled, (state, action) => {
				state.isGamesListLoading = false;
				if (action.payload.status === 200)
					state.games = action.payload.data;
				else state.gamesListError = "Не удалось получить данные";
			})
			.addCase(tryGetGamesListAsync.rejected, (state) => {
				state.isGamesListLoading = false;
				state.gamesListError = "Не удалось получить данные";
			})
			.addCase(tryCreateNewGameAsync.pending, (state) => {
				state.isCreateGameLoading = true;
			})
			.addCase(tryCreateNewGameAsync.fulfilled, (state, action) => {
				state.isCreateGameLoading = false;
				switch (action.payload.status) {
					case 200: // удалось создать новую игру
						state.isCreateGameModalOpen = true;
						state.createdGameId = action.payload.data.id;
						break;
					default:
						// TODO добавить обработку ошибки неудачной попытки создания игры
						break;
				}
			})
			.addCase(tryCreateNewGameAsync.rejected, (state) => {
				state.isCreateGameLoading = false;
			})
			.addCase(tryConnectToGameAsync.pending, (state) => {
				state.isConnectGameLoading = true;
				state.connectGameError = null;
			})
			.addCase(tryConnectToGameAsync.fulfilled, (state, action) => {
				state.isConnectGameLoading = false;
				if (action.payload.status === 200) {
					state.connectedGameId = true;
				} else {
					state.connectedGameId = null;
					state.connectGameError = "Не удалось подключиться к игре";
				}
			})
			.addCase(tryConnectToGameAsync.rejected, (state) => {
				state.isConnectGameLoading = false;
			})
	},
});

// actions
export const {setInitialState, setIsCreateGameModalOpen, setIsConnectGameModalOpen, setGamesList} = profileSlice.actions;

// selectors
export const selectGames = (state) => state.profile.games;
export const selectIsGamesListLoading = (state) => state.profile.isGamesListLoading;
export const selectIsCreateGameLoading = (state) => state.profile.isCreateGameLoading;
export const selectCreatedGameId = (state) => state.profile.createdGameId;
export const selectIsCreateGameModalOpen = (state) => state.profile.isCreateGameModalOpen;
export const selectIsConnectGameModalOpen = (state) => state.profile.isConnectGameModalOpen;
export const selectIsConnectGameLoading = (state) => state.profile.isConnectGameLoading;
export const selectConnectedGameId = (state) => state.profile.connectedGameId;
export const selectConnectGameError = (state) => state.profile.connectGameError;

export default profileSlice.reducer;