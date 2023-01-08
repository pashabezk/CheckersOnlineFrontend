import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchConnectToGame, fetchCreateGame, fetchGetGamesList} from "../API/GameAPI";

export const GAME_STATUS_WHITE_TURN = "WHITE TURN";
export const GAME_STATUS_BLACK_TURN = "BLACK TURN";
export const GAME_STATUS_BLACK_WIN = "BLACK WIN";
export const GAME_STATUS_WHITE_WIN = "WHITE WIN";
export const GAME_STATUS_WAITING_FOR_OPPONENT = "WAITING FOR OPPONENT";

const initialState = {
	games: null, // [] // список игр в профиле
	isGamesListLoading: false, // флаг загрузки списка игр в профиле

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
		const response = await fetchGetGamesList();
		return response.data;
	}
);

// запрос на создание игры
export const tryCreateNewGameAsync = createAsyncThunk(
	'profile/createNewGame',
	async () => {
		const response = await fetchCreateGame();
		return response.data;
	}
);

// запрос на подключение к игре
export const tryConnectToGameAsync = createAsyncThunk(
	'profile/connectToGame',
	async (gameId) => {
		const response = await fetchConnectToGame(gameId);
		return response.data;
	}
);

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
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
			})
			.addCase(tryGetGamesListAsync.fulfilled, (state, action) => {
				state.isGamesListLoading = false;
				state.games = action.payload;
			})
			.addCase(tryGetGamesListAsync.rejected, (state) => {
				state.isGamesListLoading = false;
			})
			.addCase(tryCreateNewGameAsync.pending, (state) => {
				state.isCreateGameLoading = true;
			})
			.addCase(tryCreateNewGameAsync.fulfilled, (state, action) => {
				state.isCreateGameLoading = false;
				state.isCreateGameModalOpen = true;
				state.createdGameId = action.payload;
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
				if (action.payload.error) {
					state.connectedGameId = null;
					state.connectGameError = action.payload.error;
				} else {
					state.connectedGameId = action.payload.connectedGameId;
				}
			})
			.addCase(tryConnectToGameAsync.rejected, (state) => {
				state.isConnectGameLoading = false;
			})
	},
});

// actions
export const {setIsCreateGameModalOpen, setIsConnectGameModalOpen} = profileSlice.actions;

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