import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchRegistration} from "../API/AuthAPI";

const initialState = {
	isLoading: false,
	error: null,
	isCompletedModalOpen: false,
};

export const tryRegisterAsync = createAsyncThunk(
	'registration/registration',
	async ({login, password}) => {
		const response = await fetchRegistration(login, password);
		// console.log("thunkResp ", response);
		return response.data;
	}
);

export const registrationSlice = createSlice({
	name: "registration",
	initialState,
	reducers: {
		setRegistrationErrorMsg: (state, action) => {
			state.error = action.payload;
		},
		setIsRegistrationCompletedModalOpen: (state, action) => {
			state.isCompletedModalOpen = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(tryRegisterAsync.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(tryRegisterAsync.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.error === 0) {
					state.isCompletedModalOpen = true;
				}
				else {
					state.error = action.payload.errorMsg;
				}
			})
			.addCase(tryRegisterAsync.rejected, (state) => {
				state.isLoading = false;
				state.error = "Что-то пошло не так";
			})
	},
});

// actions
export const {setRegistrationErrorMsg, setIsRegistrationCompletedModalOpen} = registrationSlice.actions;

// selectors
export const selectRegistrationIsLoading = (state) => state.registration.isLoading;
export const selectRegistrationError = (state) => state.registration.error;
export const selectRegistrationIsCompletedModalOpen = (state) => state.registration.isCompletedModalOpen;

export default registrationSlice.reducer;