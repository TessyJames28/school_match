import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Favorite from './pages/Favorite'
import Landing from './pages/Landing'
import LandingDashBoard from './pages/LandingDashBoard'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Search from './pages/Search'
import SearchResult from './pages/SearchResults'
import Update from './pages/UpdateProfile'
import store from './redux/store'

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route index element={<Landing />} ></Route>
					<Route path='/dashboard' element={
						<ProtectedRoute>
							<LandingDashBoard />
						</ProtectedRoute>}> </Route>
					<Route path='/register' element={<Register />}> </Route>
					<Route path='/login' element={<Login />}> </Route>
					<Route path='/update' element={
						<ProtectedRoute>
							<Update />
						</ProtectedRoute>}> </Route>
					<Route path="/favorites" element={<ProtectedRoute>
						<Favorite />
					</ProtectedRoute>}></Route>
					<Route path='/profile' element={<ProtectedRoute>
						<Profile />
					</ProtectedRoute>}></Route>
					<Route path='/search' element={<ProtectedRoute>
						<Search />
					</ProtectedRoute>}></Route>
					<Route path='/search_result' element={<ProtectedRoute>
						<SearchResult />
					</ProtectedRoute>}></Route>
					<Route path='*' element={<NotFound />}></Route>
				</Routes>
			</Router>
		</Provider>
	)
}

export default App
