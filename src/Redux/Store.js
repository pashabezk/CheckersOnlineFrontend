import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./AuthReducer"
import gameReducer from "./GameReducer"
import profileReducer from "./ProfileReducer"
import menuReducer from "./MenuReducer"

const store = configureStore({
	reducer: combineReducers({
		auth: authReducer,
		menu: menuReducer,
		game: gameReducer,
		profile: profileReducer
	})
});

export default store;