import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
	name: 'app',
	initialState: { user: {}, searchResult: [] },
	reducers: {
		setUserData: (state, action) => {
			state.user = action.payload
		},
		setSearchResult: (state, action) => {
			state.searchResult = action.payload
		}
	}
})


export const {
	setUserData,
	setSearchResult
} = appSlice.actions

export default appSlice.reducer
