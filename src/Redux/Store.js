import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./AuthReducer"
import gameReducer from "./GameReducer"
import profileReducer from "./ProfileReducer"
import menuReducer from "./MenuReducer"
import registrationReducer from "./RegistrationReducer"

const store = configureStore({
	reducer: combineReducers({
		auth: authReducer,
		registration: registrationReducer,
		menu: menuReducer,
		game: gameReducer,
		profile: profileReducer
	})
});

export default store;