import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { search } from '../api/client'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { setSearchResult, setUserData } from '../redux/AppSlice'

const Search = () => {
	const navbg = '#002e29'
	const title = "Search For School. Leave Unneeded Fields Blank."
	const submitText = "Search"
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [school, setSchool] = useState(null)
	const [course, setCourse] = useState(null)
	const [program, setProgram] = useState(null)
	const [degree, setDegree] = useState(null)
	const [grade, setGrade] = useState(null)
	const [type, setType] = useState(null)
	const [country, setCountry] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		let searchResult = await search({ country, type, grade, degree, program, course, school })
		if (searchResult.data || Array.isArray(searchResult.data)) {
			dispatch(setSearchResult(searchResult.data))
			navigate('/search_result', { state: { results: searchResult.data }, preventScrollReset: true })
		}
	}

	return (
		<>
			<Box minHeight='100vh' width='100vw' bgcolor='teal'>
				{/* Nav Bar */}
				<NavBar options={['home', 'profile', 'favorites', 'search', 'logout']} />

				{/* main page */}
				<Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={5} flexDirection={'column'} width={'100vw'}>
					<Stack width={'100vw'}>
						<Typography fontSize={'2rem'} fontWeight={500} sx={{ textAlign: 'start', ml: 4 }}>
							{title}
						</Typography>
					</Stack>

					<Stack direction={'row'} spacing={10} sx={{ p: 2 }}>
						<img src='/online_test.svg' alt='certificate png' style={
							{
								width: '40%',
								height: '40%'
							}
						} />

						<Box component={'form'} sx={{ translate: '0px -20px', width: '150%' }} onSubmit={handleSubmit}>
							{[
								{ label: "Search by school", id: "school", type: 'text', placeholder: 'eg. Red', stateFunc: setSchool },
								{ label: "Search by type", id: "type", type: 'text', placeholder: 'eg. College', stateFunc: setType },
								{ label: "Search by country", id: "country", type: 'text', placeholder: 'eg. Canada', stateFunc: setCountry },
								{ label: "Search by grade", id: "grade", type: 'text', placeholder: 'eg. 2.2', stateFunc: setGrade },
								{ label: "Search by degree", id: "degree", type: 'text', placeholder: 'eg. Diploma', stateFunc: setDegree },
								{ label: "Search by course", id: "course", type: 'text', placeholder: 'eg. Computer', stateFunc: setCourse },
								{ label: "Search by program", id: "program", type: 'text', placeholder: 'eg. Engineering', stateFunc: setProgram },

							].map((v, i) => {
								return <TextField
									onChange={(e) => {
										v.stateFunc(e.target.value)
									}}
									key={i}
									color='text'
									margin='normal'
									fullWidth
									id={v.id}
									type={v.type}
									label={v.label}
									placeholder={v.placeholder}
								/>
							})}
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
				</Box >
				<Footer />
			</Box >
		</>
	)
}

export default Search

