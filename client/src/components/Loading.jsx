import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const Loading = () => {
	return (
		<Box minHeight={'100vh'} width={'100vw'} bgcolor={'teal'}>
			<Typography fontSize={'30px'} fontWeight={700} textAlign={'center'}>
				Loading ...
			</Typography>
		</Box>
	)
}

export default Loading
