// libraries
import React, { FC, MouseEvent } from 'react';
import { Button, Grid } from '@mui/material';
//hooks
// components
//styles
import styles from './Footer.module.scss';

interface IPlaylistFooterProps {
	title: string;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
export const PlaylistFooter: FC<IPlaylistFooterProps> = ({
	title,
	onClick,
}) => {
	return (
		<Grid
			container
			justifyContent='flex-end'
			className={styles.footer}
			padding='12px 24px'>
			<Button type='submit' onSubmit={onClick} onClick={onClick}>
				{title}
			</Button>
		</Grid>
	);
};
