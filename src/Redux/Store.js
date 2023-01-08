import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./AuthReducer"
import gameReducer from "./GameReducer"
import profileReducer from "./ProfileReducer"

const store = configureStore({
	reducer: combineReducers({
		auth: authReducer,
		game: gameReducer,
		profile: profileReducer
	})
});

export default store;