import { configureStore } from '@reduxjs/toolkit'
import appReducer from './AppSlice'

const store = configureStore({
	reducer: {
		app: appReducer,
		devTools: true
	}
})

export default store

