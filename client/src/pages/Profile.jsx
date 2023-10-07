import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'

const Profile = () => {
	const navigate = useNavigate()
	const user = useSelector(state => state.app.user)

	return (
		<Stack display={'flex'} flexDirection={'column'} height={'100vh'}>
			<NavBar options={['home', 'profile', 'favorites', 'search', 'logout']} />
			<Box flex={1}  width={'100vw'} sx={{ p: '2rem', background: 'teal' }}>
				<Stack flex={1}>
					{
						[
							{ name: "First name", value: user?.first_name },
							{ name: "Last name", value: user?.last_name },
							{ name: "Email", value: user?.email },
							{ name: "Username", value: user?.username }
						].map((v, i) => {
							return <Typography key={i} fontSize={'2rem'} fontWeight={600}>
								{v.name}: {v.value}
							</Typography>
						})
					}
					<Button onClick={() => {
						navigate('/update')
					}}
						sx={{
							background: 'black',
							width: '30vw',
							my: '3px',
							color: 'white',
							'&:hover': {
								background: 'black'
							}

						}}
					>
						<Typography>Update Profile</Typography>
					</Button>
				</Stack>
			</Box>
			<Footer />
		</Stack>
	)
}

export default Profile
