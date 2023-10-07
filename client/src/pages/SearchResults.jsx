import { Favorite } from '@mui/icons-material'
import { Box, Card, CardMedia, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { useLocation } from 'react-router-dom'
import { addToFavorite } from '../api/client'


const SearchResult = () => {
	const searchState = useSelector(state => state.app.searchResult)
	const user = useSelector(state => state.app.user)
	const location = useLocation()
	const searchResults = location.state.results || searchState

	return (
		<>
			<Box minHeight='100vh' width='100vw' bgcolor='teal'>
				{/* Nav Bar */}
				<NavBar options={['home', 'profile', 'favorites', 'search', 'logout']} />

				<Stack minHeight={'100vh'}>
					<Stack>
						<Typography marginLeft={10} fontWeight={700} fontSize={'2rem'} marginTop='10px'>
							Search Results
						</Typography>
					</Stack>
					<Stack>
						{searchResults.map((v, i) => <Stack key={i} direction={'row'} spacing={3} sx={{ mx: 10, my: 3 }}>
							<Stack sx={{ zIndex: 1 }}>
								<Card >
									<CardMedia
										sx={{ objectFit: 'cover', width: '20rem', margin: '0px', background: 'grey', zIndex: '-99' }}
										component='img'
										height='200px'
										alt="media banner"
										loading='lazy'
										src={'/exp.png'}

									/>
								</Card>
							</Stack>
							<Stack spacing={1}>
								<Typography fontWeight={600}>{v.school.name}, {v.school.country}</Typography>
								<Typography><b>Course:</b>{v.course.name}</Typography>
								<Typography><b>Degree:</b> {v.degree.title}</Typography>
								<Typography><b>Grade:</b> {v.grade.grade}</Typography>
								<Typography><b>Category:</b>{v.school.school_type}</Typography>
								<IconButton
									onClick={async () => {
										let res = await addToFavorite(user.id, v.id)
										if (res.data) {
											alert('Added to favorites')
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
						</Stack>)}
					</Stack>

				</Stack>
				<Footer />

			</Box>
		</>
	)
}

export default SearchResult
