//libraties
import React, { FC, useState, MouseEvent, useContext } from 'react';
import {
	CheckRounded,
	EditOutlined,
	PlayArrowRounded,
	SubjectRounded,
} from '@material-ui/icons';
//conponents

import {
	PlaylistService,
	generateUrl,
	merge,
	useAction,
	useTypedSelector,
} from '@shared';
//styles
import styles from './PlaylistImage.module.scss';
import general from '@shared/styles/General.module.scss';
import { SquareDiv } from '@shared/ui';
import { Box, Typography } from '@mui/material';
import { PlaylistContext } from '../PlaylistItem';
import { AddRounded } from '@mui/icons-material';
import { useAppDispatch } from '@shared/store';

const imageSize = 70;
interface IPlaylistImageHandlers {
	onPlay: () => void;
	onEdit: () => void;
}
interface IPlaylistProps {
	source: string;
	alt: string;
	size: string | number;
	handlers: IPlaylistImageHandlers;
}
export const PlaylistImage: FC<IPlaylistProps> = ({
	source,
	alt,
	size,
	handlers,
}) => {
	const dispatch = useAppDispatch();
	const { _playlist } = useAction();
	const { user } = useTypedSelector(i => i.account);
	const { playlistsToDelete } = useTypedSelector(i => i.playlists);

	const [isHover, setHover] = useState<boolean>(false);
	const playlist = useContext(PlaylistContext);
	const isUserOwner = playlist.owner.id === (user && user.id);

	//handlers
	const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setHover(true);
	};
	const onMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setHover(false);
	};
	const handleManagePlaylistsToDelete = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(_playlist.managePlaylistToDeleteFromUser(playlist.id));
	};

	return (
		<div className={general.relative}>
			<SquareDiv
				size={size}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}>
				<img
					src={generateUrl(source)}
					alt={alt}
					width={size}
					height={size}
					className={styles.br8}
				/>

				{isHover ? (
					<SquareDiv
						size={size}
						className={merge(general.backdrop, styles.br8)}>
						<Box className={styles.action_buttons_wrap}>
							<Box className={styles.action_buttons}>
								{isUserOwner ? (
									<SquareDiv
										size={60}
										className={merge(styles.btn, styles.edit_btn)}
										onClick={handlers.onEdit}>
										<EditOutlined fontSize='inherit' color='inherit' />
									</SquareDiv>
								) : (
									<SquareDiv
										size={60}
										className={merge(styles.btn, styles.edit_btn)}
										onClick={handleManagePlaylistsToDelete}>
										{playlistsToDelete.includes(playlist.id) ? (
											<AddRounded fontSize='inherit' color='inherit' />
										) : (
											<CheckRounded fontSize='inherit' color='inherit' />
										)}
									</SquareDiv>
								)}

								<SquareDiv
									size={60}
									className={merge(styles.btn, styles.play_btn)}
									onClick={handlers.onPlay}>
									<PlayArrowRounded fontSize='inherit' color='inherit' />
								</SquareDiv>

								<SquareDiv size={60} className={merge(styles.btn)}>
									{}
								</SquareDiv>
							</Box>

							<Box className={merge(styles.btn, styles.playlist_stats)}>
								<SubjectRounded fontSize='inherit' color='inherit' />
								<Typography>{playlist.numberOfTracks}</Typography>
							</Box>
						</Box>
					</SquareDiv>
				) : null}
			</SquareDiv>
		</div>
	);
};
