import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTokenFromCookie, getUserIdFromCookie, putTokenToCookie, putUserIdToCookie, removeTokenFromCookie, removeUserIdFromCookie} from "../Cookie/AuthWithCookie";
import {fetchLogin, fetchUserDataById} from "../API/UserAPI";

const initialState = {
	token: getTokenFromCookie(), // при инициализации попытка прочитать токен из куки
	userId: getUserIdFromCookie(), // и идентификатор пользователя; это необходимо для поддержки браузерной сессии
	login: null,
	isAuthing: false,
	error: null
};

export const tryLogInAsync = createAsyncThunk(
	'auth/tryLogIn',
	async ({login, password}) => {
		const response = await fetchLogin(login, password)
			.catch(reason => reason.response);
		return {
			data: response.data,
			status: response.status
		};
	}
);

export const tryGetLoginUserDataAsync = createAsyncThunk(
	'auth/getLoginUserData',
	async (id) => {
		const response = await fetchUserDataById(id)
			.catch(reason => reason.response);
		return response.data;
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthError: (state, action) => {
			state.error = action.payload;
		},
		// вызывается при нажатии на кнопку "Выйти"
		setLogoutData: (state, action) => {
			removeTokenFromCookie(); // удаление токена из cookie
			removeUserIdFromCookie(); // удаление ИД пользователя из куки
			state.isAuthing = false;
			state.token = undefined;
			state.userId = null;
			state.login = null;
			state.error = null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(tryLogInAsync.pending, (state) => {
				state.isAuthing = true;
			})
			.addCase(tryLogInAsync.fulfilled, (state, action) => {
				state.isAuthing = false;
				switch (action.payload.status) {
					case 200:
						state.userId = action.payload.data.user.id;
						state.login = action.payload.data.user.username;
						state.token = action.payload.data.token;
						state.error = null;
						putTokenToCookie(action.payload.data.token); // сохранение полученного токена в куки
						putUserIdToCookie(action.payload.data.user.id);
						break;
					case 400:
						state.error = "Неправильный логин или пароль";
						break;
					default:
						state.error = "Что-то пошло не так";
						break;
				}
			})
			.addCase(tryLogInAsync.rejected, (state) => {
				state.isAuthing = false;
				state.error = "Что-то пошло не так";
			})
			.addCase(tryGetLoginUserDataAsync.pending, (state) => {
				state.isAuthing = true;
			})
			.addCase(tryGetLoginUserDataAsync.fulfilled, (state, action) => {
				state.isAuthing = false;
				if (action.payload.username) { // если удалось получить пользователя, то сохраним его логин
					state.login = action.payload.username;
				} else { // иначе сбрасываем сессию
					removeTokenFromCookie();
					removeUserIdFromCookie();
				}
			})
			.addCase(tryGetLoginUserDataAsync.rejected, (state) => {
				state.isAuthing = false;
			});
	},
});

// actions
export const {setAuthError, setLogoutData} = authSlice.actions;

// selectors
export const selectLogin = (state) => state.auth.login;
export const selectToken = (state) => state.auth.token;
export const selectUserId = (state) => state.auth.userId;
export const selectIsAuthing = (state) => state.auth.isAuthing;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;