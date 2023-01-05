import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchLogIn, fetchLogOut, fetchWhoAmI} from "../API/AuthAPI";
import {getTokenFromCookie, putTokenToCookie, removeTokenFromCookie} from "../Cookie/AuthWithCookie";
import {fetchLogin} from "../API/TestAPI";

const initialState = {
	token: getTokenFromCookie(),
	userId: null,
	login: null,
	isAuthing: false,
	error: null
};

// export const tryLogInAsync = createAsyncThunk(
// 	'auth/tryLogIn',
// 	async ({login, password}) => {
// 		const response = await fetchLogin(login, password);
// 		console.log("------------ login", response);
// 		return response.data;
// 	}
// );

export const tryLogInAsync = createAsyncThunk(
	'auth/tryLogIn',
	async ({login, password}) => {
		const response = await fetchLogIn(login, password);
		return response.data;
	}
);

export const tryLogOutAsync = createAsyncThunk(
	'auth/tryLogOut',
	async () => {
		const response = await fetchLogOut();
		return response.data;
	}
);

export const getInfoFromTokenAsync = createAsyncThunk(
	'auth/getInfoFromToken',
	async (token) => {
		const response = await fetchWhoAmI(token);
		return response.data;
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthError: (state, action) => {
			state.error = action.payload;
		}
		// incrementByAmount: (state, action) => {
		// 	state.value += action.payload;
		// }
	},
	extraReducers: (builder) => {
		builder
			.addCase(tryLogInAsync.pending, (state) => {
				state.isAuthing = true;
			})
			.addCase(tryLogInAsync.fulfilled, (state, action) => {
				state.isAuthing = false;
				if (action.payload.error === 0) {
					state.userId = action.payload.id;
					state.login = action.payload.login;
					state.token = action.payload.token;
					state.error = null;
					putTokenToCookie(action.payload.token); // сохранение полученного токена в куки
				} else {
					state.error = action.payload.errorMsg;
				}
			})
			.addCase(tryLogInAsync.rejected, (state) => {
				state.isAuthing = false;
				state.error = "Что-то пошло не так";
			})
			.addCase(tryLogOutAsync.pending, (state) => {
				state.isAuthing = true;
				state.token = undefined;
				removeTokenFromCookie(); // удаление токена из cookie
			})
			.addCase(tryLogOutAsync.fulfilled, (state, action) => {
				state.isAuthing = false;
				if (action.payload.error === 0) {
					state.userId = null;
					state.login = null;
					state.error = null;
				}
			})
			.addCase(getInfoFromTokenAsync.rejected, (state) => {
				state.isAuthing = false;
			})
			.addCase(getInfoFromTokenAsync.pending, (state) => {
				state.isAuthing = true;
			})
			.addCase(getInfoFromTokenAsync.fulfilled, (state, action) => {
				state.isAuthing = false;
				if (action.payload.error === 0) {
					state.userId = action.payload.id;
					state.login = action.payload.login;
					state.error = null;
				} else {
					state.error = action.payload.errorMsg;
				}
			})
			.addCase(tryLogOutAsync.rejected, (state) => {
				state.isAuthing = false;
			});
	},
});

// actions
export const {setAuthError} = authSlice.actions;

// selectors
export const selectLogin = (state) => state.auth.login;
export const selectToken = (state) => state.auth.token;
export const selectUserId = (state) => state.auth.userId;
export const selectIsAuthing = (state) => state.auth.isAuthing;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;