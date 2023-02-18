// libraries
import React, { FC, MouseEvent } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { CloseRounded } from '@material-ui/icons';
//hooks
// components
//styles
import styles from './Header.module.scss';

interface IPlaylistHeaderProps {
	title: string;
	onClose: (e: MouseEvent<HTMLDivElement>) => void;
}
export const PlaylistHeader: FC<IPlaylistHeaderProps> = ({
	title,
	onClose,
}) => {
	return (
		<Box className={styles.header}>
			<Grid container direction={'row'} justifyContent='space-between'>
				<Box padding={'12px 24px'}>
					<Typography>{title}</Typography>
				</Box>
				<Box padding={'12px 24px'} onClick={onClose} className={styles.close}>
					<CloseRounded />
				</Box>
			</Grid>
		</Box>
	);
};
