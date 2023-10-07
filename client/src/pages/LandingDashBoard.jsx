import { Favorite } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToFavorite, searchGeneral } from '../api/client'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'

const LandingDashBoard = () => {
	const [schools, setSchools] = useState([])
	const [loading, setLoading] = useState(true)
	const [iconColor, setIconColor] = useState('white')
	const user = useSelector(state => state.app.user)

	useEffect(() => {
		const gen = searchGeneral()
		gen.then(data => {
			setLoading(false)
			setSchools(data)
		})
	}, [])

	return (
		<>
			{loading ? <Loading /> :
				<Box minHeight='100vh' width='100vw' bgcolor='teal'>
					{/* Nav Bar */}
					<NavBar options={['home', 'profile', 'favorites', 'search', 'logout']} />

					<Stack sx={{ mx: '20px' }} display={'flex'} >
						<Typography sx={{ fontWeight: 700, fontSize: '3.5rem' }}>Welcome, {user.username} </Typography>
						<h3 style={{ textAlign: 'start', fontSize: '5rem', color: 'white', marginTop: '1rem', marginBottom: '5px', fontFamily: 'monospace' }}>Our Schools</h3>
						{
							schools.map((v, i) => {
								return <Stack
									key={i} display={'flex'} flexDirection={'row'} gap={"2p"} sx={{ my: '5px', width: '80%' }}>
									<Stack sx={{ mr: '30px' }}>
										<img src="/exp.png" alt="school image" style={{
											width: '400px', borderRadius: '2px'
										}} />
									</Stack>
									<Stack>
										<Typography><b>{v.school.name}, {v.school.country}</b></Typography>
										<Typography><b>{v.school.type}</b></Typography>
										<Typography><b>{v.degree.title}</b></Typography>
										<Typography><b>{v.grade.grade}</b></Typography>
										<Typography><b>{v.course.name}</b></Typography>
										<IconButton onClick={async () => {
											let res = await addToFavorite(user.id, v.id)
											if (res.data) {
												alert('Added to favorites')
												setIconColor('black')
											}
										}}
											sx={{
												'&:hover': {
													background: 'transparent'
												},
												width: "10px"

											}}>
											<Favorite />
										</IconButton>
									</Stack>

								</Stack>
							})
						}
					</Stack>
					<Footer />
				</Box>
			}
		</>
	)
}

export default LandingDashBoard
