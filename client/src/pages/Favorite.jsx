import { Box, Card, CardMedia, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { deleteFavorite, getFavorites } from '../api/client'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'
import { Delete } from '@mui/icons-material'
import { useSelector } from 'react-redux'

const Favorite = () => {
	const user = useSelector(state => state.app.user)
	const [favorites, setFavorites] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let favorites = getFavorites().then(res => {
			return res
		})
		favorites = favorites.then(res => {

			if (res.data) {
				setFavorites(res.data.results)
				setLoading(false)
			}
		})
	}, [favorites])

	return (
		<>
			{
				loading ? <Loading /> :
					<Box minHeight='100vh' width='100vw' bgcolor='teal' sx={{ display: 'flex', flexDirection: 'column' }}>
						{/* Nav Bar */}
						<NavBar options={['home', 'profile', 'favorites', 'search', 'logout']} />

						<Stack margin={'auto'} flex={1}>
							<Stack>
								<Typography marginLeft={10} fontWeight={700} fontSize={'2rem'} marginTop='5px'>
									Your Favorites
								</Typography>
							</Stack>
							<Stack>
								{favorites.map((v, i) => <Stack key={i} direction={'row'} spacing={3} sx={{ mx: 10, my: 3 }}>
									<Stack sx={{ zIndex: 1 }}>
										<Card >
											<CardMedia
												sx={{ objectFit: 'cover', width: '20rem', margin: '0px', background: 'grey', zIndex: '-99' }}
												component='img'
												height='300px'
												alt="media banner"
												loading='lazy'
												src={'/exp.png'}
											/>
										</Card>
									</Stack>
									<Stack spacing={1}>
										<Typography fontWeight={600}>{v.department.school.name}</Typography>
										<Typography>{v.department.program.program_detail}</Typography>
										<Typography><b>Degree:</b> {v.department.degree.title}</Typography>
										<Typography><b>Grade:</b> {v.department.grade.grade}</Typography>
										<Typography><a href={v.department.school.school_link}>Visit Us</a></Typography>
										<IconButton onClick={async () => {
											await deleteFavorite(v.id, user.id)
											let fave = await getFavorites()
											if (fave.data.results) {
												setFavorites(fave.data.results)
											}
											// todo

										}}
											sx={{
												'&:hover': {
													background: 'transparent'
												},
												width: "10px"

											}}
										>
											<Delete />
										</IconButton>
									</Stack>
								</Stack>)}
							</Stack>

						</Stack>

						<Footer />

					</Box>
			}
		</>
	)
}

export default Favorite
