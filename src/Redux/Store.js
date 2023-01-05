import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./AuthReducer"
import gameReducer from "./GameReducer"

const store = configureStore({
	reducer: combineReducers({
		auth: authReducer,
		game: gameReducer,
		// alfaBank: alfaBankReducer
	})
});

export default store;