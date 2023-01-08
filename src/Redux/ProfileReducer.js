import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchGetGamesList} from "../API/GameAPI";

export const GAME_STATUS_WHITE_TURN = "WHITE TURN";
export const GAME_STATUS_BLACK_TURN = "BLACK TURN";
export const GAME_STATUS_BLACK_WIN = "BLACK WIN";
export const GAME_STATUS_WHITE_WIN = "WHITE WIN";
export const GAME_STATUS_WAITING_FOR_OPPONENT = "WAITING FOR OPPONENT";

const initialState = {
	games: null, // []
	isGamesListLoading: false
};

export const tryGetGamesListAsync = createAsyncThunk(
	'profile/getGamesList',
	async () => {
		const response = await fetchGetGamesList();
		return response.data;
	}
);

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		// setAuthError: (state, action) => {
		// 	state.error = action.payload;
		// }
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
	},
});

// actions
// export const {setAuthError} = profileSlice.actions;

// selectors
export const selectGames = (state) => state.profile.games;
export const selectIsGamesListLoading = (state) => state.profile.isGamesListLoading;

export default profileSlice.reducer;