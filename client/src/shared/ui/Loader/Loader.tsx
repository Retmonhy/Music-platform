import React from 'react';
import { Box } from '@mui/material';

export const Loader = () => {
	return (
		<Box className='loader' data-testid='loader'>
			<Box className='loader__wheel'></Box>
		</Box>
	);
};
