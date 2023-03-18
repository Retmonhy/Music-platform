// libraries
import React, { FC, MouseEvent } from 'react';
import { Button, Grid } from '@mui/material';
//hooks
// components
//styles
import styles from './Footer.module.scss';

interface IPlaylistFooterProps {
	title: string;
	onClick: () => void;
}
export const PlaylistFooter: FC<IPlaylistFooterProps> = ({
	title,
	onClick,
}) => {
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		onClick();
	};
	return (
		<Grid
			container
			justifyContent='flex-end'
			className={styles.footer}
			padding='12px 24px'>
			<Button onClick={handleClick}>{title}</Button>
		</Grid>
	);
};
