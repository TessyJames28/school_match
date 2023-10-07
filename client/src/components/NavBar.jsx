import { Button, Stack, Typography } from '@mui/material'
import Cookie from 'js-cookie'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = ({ options }) => {
	const navigate = useNavigate()
	const navbg = '#002e29'
	return (
		<Stack direction='row' bgcolor={navbg} height='80px' paddingLeft={2}>
			<Stack flexGrow={1}>
				<Typography fontSize='3rem' fontWeight={700} color="white">
					<Link to='/' style={{ textDecoration: "None" }}>School Match</Link>
				</Typography>
			</Stack>

			<Stack spacing={2} direction='row' padding={2}>
				{
					[{ name: "Home", link: "/dashboard" },
					{ name: "Profile", link: "/profile" },
					{ name: "Favorites", link: '/favorites' },
					{ name: "Sign Up", link: '/register' },
					{ name: "Sign In", link: '/login' },
					{ name: "Search", link: '/search' },
					{ name: "Logout", link: '/' }
					]
						.map((v, i) => {
							{
								if (options && options.length >= 1) {
									if (options.includes(v.name.toLowerCase())) {
										return <Button key={i} onClick={() => {
											if (v.name == 'Logout') {
												Cookie.set('token', '')
											}
											navigate(v.link)
										}}>
											<Typography color="white" fontSize='1.5rem'>
												{v.name}
											</Typography>
										</Button>
									}
								} else {
									return <Button key={i} onClick={() => { navigate(v.link) }}>
										<Typography color="white" fontSize='1.5rem'>
											{v.name}
										</Typography>
									</Button>
								}

							}
						})}

			</Stack>
		</Stack>
	)
}

export default NavBar
