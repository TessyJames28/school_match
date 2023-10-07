import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

const Landing = () => {
	const navbg = '#002e29'
	const navigate = useNavigate()

	return (
		<>
			<Box minHeight='100vh' width='100vw' bgcolor='teal'>
				{/* Nav Bar */}
				<NavBar options={["sign up", "sign in"]} />
				<Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={5}>
					<Stack direction={'row'} spacing={5} padding={15}>
						<img src='/online_test.svg' alt='certificate png' style={
							{
								width: '25%',
								height: '25%'
							}
						} />
						<Stack>
							<Typography fontSize={'2rem'} fontWeight={500}>
								Our website helps you to find the best schools suited for your qualifications from various universities around the world
							</Typography>
							<Button style={{
								background: navbg,
								margin: '10px',
								width: '40%'
							}} onClick={() => {
								navigate('/dashboard')
							}}>
								<Typography>
									Come Onboard!
								</Typography>
							</Button>
						</Stack>
					</Stack>
				</Box>
				<Footer />

			</Box>
		</>
	)
}

export default Landing
