import React from 'react';

import styles from './Loader.module.scss';
import { Box } from '@mui/material';

export const Loader = () => {
	return (
		<Box className={styles.loader_wrapper}>
			<Box className={styles.loader}></Box>
		</Box>
	);
};
