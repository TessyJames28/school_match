import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserProfile } from '../api/client'
import { useNavigate } from 'react-router-dom'
import { setUserData } from '../redux/AppSlice'

const Update = () => {
	const navbg = '#002e29'
	const submitText = "Submit"
	const type = "Update Profile"
	const user = useSelector(state => state.app.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [userInfo, setUserInfo] = useState(user)
	const [first_name, setfirst_name] = useState(user.first_name)
	const [last_name, setlast_name] = useState(user.last_name)
	const [email, setEmail] = useState(user.email)
	const [username, setUsername] = useState(user.username)
	const [password, setPassword] = useState("")
	const [confirm_password, setConfirm_password] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		let post_data = { first_name, last_name, email, username, password, confirm_password }
		let user_created = updateUserProfile(post_data, user.id).then(res => res)
		user_created = user_created.then(res => {
			if (res.error) {
				(res.error)
			} else {
				dispatch(setUserData({ ...userInfo, ...post_data }))
				navigate('/profile', { replace: true, preventScrollReset: true })
			}
		})

	}

	return (
		<>
			<Box minHeight='100vh' width='100vw' bgcolor='teal'>
				{/* Nav Bar */}

				<NavBar options={['home', 'profile', 'favorites', 'search', 'logout']} />
				{/* main page */}
				<Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={5} flexDirection={'column'} width={'100vw'}>
					<Stack width={'100vw'}>
						<Typography fontSize={'2rem'} fontWeight={700} sx={{ textAlign: 'start', ml: 4 }}>
							{type}
						</Typography>
					</Stack>

					<Stack direction={'row'} spacing={10} sx={{ px: 2, py: 3 }}>
						<img src='/online_test.svg' alt='certificate png' style={
							{
								width: '40%',
								height: '40%',
								paddingTop: '12px'
							}
						} />

						<Box component={'form'} onSubmit={handleSubmit}>
							{[
								{ label: "First name", id: "first_name", type: 'text', value: first_name },
								{ label: "Last name", id: "last_name", type: 'text', value: last_name },
								{ label: 'Email Address', id: "email", type: 'email', value: email },
								{ label: 'Password', id: 'password', type: 'password', value: password },
								{ label: 'Confirm Password', id: 'confirm_password', type: 'password', value: confirm_password },

							].map((v, i) => <TextField
								onChange={(e) => {
									switch (true) {
										case "first_name" == v.id:
											setUserInfo({ ...userInfo, first_name: e.target.value })
											setfirst_name(e.target.value)
											break;
										case "last_name" == v.id:
											setUserInfo({ ...userInfo, last_name: e.target.value })
											setlast_name(e.target.value)
											break;
										case "email" == v.id:
											setUserInfo({ ...userInfo, email: e.target.value })
											setEmail(e.target.value)
											break;
										case "username" == v.id:
											setUserInfo({ ...userInfo, username: e.target.value })
											setUsername(e.target.value)
											break;
										case "password" == v.id:
											setPassword(e.target.value)
											break;
										case "confirm_password" == v.id:
											setConfirm_password(e.target.value)
											break;
										default:
											break;
									}
								}}
								color='text'
								value={v.value}
								key={i}
								margin='normal'
								required
								fullWidth
								id={v.id}
								type={v.type}
								label={v.label}
							/>)}

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

			</Box>
		</>
	)
}

export default Update
