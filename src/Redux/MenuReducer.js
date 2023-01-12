import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	openedMenuBlocks: ["games"] // список раскрытых блоков меню
};

export const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		setOpenedMenuBlocks: (state, action) => {
			state.openedMenuBlocks = action.payload;
		}
	}
});

// actions
export const {setOpenedMenuBlocks} = menuSlice.actions;

// selectors
export const selectOpenedMenuBlocks = (state) => state.menu.openedMenuBlocks;

export default menuSlice.reducer;