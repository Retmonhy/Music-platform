// libraries
import React, { FC, MouseEvent } from 'react';
import { Grid, Link } from '@mui/material';
//hooks
// components
import { ButtonEl } from '@shared/ui';
//styles
import vars from '@shared/styles/Variables.module.scss';
import styles from './Footer.module.scss';
import {
	PlaylistMode,
	PlaylistService,
	useAction,
	usePlaylist,
	useTypedSelector,
} from '@shared';
import { useAppDispatch } from '@shared/store';

interface IPlaylistFooterProps {
	title: string;
	onClick: () => void;
}
export const PlaylistFooter: FC<IPlaylistFooterProps> = ({
	title,
	onClick,
}) => {
	const { close } = usePlaylist();
	const dispatch = useAppDispatch();
	const { mode, info } = useTypedSelector(i => i.playlistModal);
	const { user } = useTypedSelector(i => i.account);
	const { _playlist } = useAction();
	const isCanDeleted = mode === PlaylistMode.Edit && info.owner.id === user.id;
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		onClick();
	};
	const handleDelete = async () => {
		const { data } = await PlaylistService.deletePlaylist(info.id);
		if (data.isSuccess) {
			dispatch(_playlist.fetchUserPlaylists());
			close();
		}
	};
	return (
		<Grid
			container
			justifyContent={isCanDeleted ? 'space-between' : 'flex-end'}
			className={styles.footer}
			padding='12px 24px'>
			{isCanDeleted ? (
				<Link
					href='#'
					color={vars.dangerColor}
					underline='always'
					onClick={handleDelete}>
					Удалить
				</Link>
			) : null}
			<ButtonEl onClick={handleClick}>{title}</ButtonEl>
		</Grid>
	);
};
