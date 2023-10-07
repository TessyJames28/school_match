import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import Cookie from 'js-cookie'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInUser } from '../api/client'
import NavBar from '../components/NavBar'
import { setUserData } from '../redux/AppSlice'
import Footer from '../components/Footer'

const Login = () => {
	const navbg = '#002e29'
	const type = "Login"
	const submitText = "Sign in"

	const dispatch = useDispatch()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		let user_data = signInUser({ username, password }).then(res => res)
		user_data = user_data.then((res) => {
			if (res.error) {
				alert(res.error)
			}
			else {
				Cookie.set('token', res.token)
				dispatch(setUserData(res.data))
				navigate('/dashboard', { replace: true })
			}
		})
	}

	return (
		<>
			<Box minHeight='100vh' width='100vw' bgcolor='teal'>
				{/* Nav Bar */}
				<NavBar options={['sign up']} />

				{/* main page */}
				<Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={5} flexDirection={'column'} width={'100vw'}>
					<Stack width={'100vw'}>
						<Typography fontSize={'2rem'} fontWeight={700} sx={{ textAlign: 'start', ml: 4 }}>
							{type}
						</Typography>
					</Stack>

					<Stack direction={'row'} spacing={10} sx={{ p: 2 }}>
						<img src='/online_test.svg' alt='certificate png' style={
							{
								width: '40%',
								height: '40%'
							}
						} />

						<Box component={'form'} onSubmit={handleSubmit}>
							<TextField
								onChange={(e) => { setUsername(e.target.value) }}
								margin='normal'
								required
								fullWidth
								id='username'
								label='Username'
								autoComplete='username'
							/>
							<TextField
								onChange={(e) => { setPassword(e.target.value) }}
								margin='normal'
								required
								fullWidth
								id='password'
								label='Password'
								autoComplete='current-password'
								type="password"
							/>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{
									mt: 2,
									background: navbg,
									':hover': {
										bgcolor: 'green'
									}
								}}
							>
								{submitText}
							</Button>
						</Box>

					</Stack>
				</Box>
				<Footer />
			</Box>
		</>
	)
}

export default Login
