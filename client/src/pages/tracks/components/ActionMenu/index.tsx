import { Button } from '@material-ui/core';
import {
	AddRounded,
	ExpandMoreRounded,
	MoreHorizRounded,
} from '@material-ui/icons';
import { Box, Popper } from '@mui/material';
import React, { useEffect, MouseEvent, FC, useContext, useState } from 'react';
import styles from './ActionMenu.module.scss';
import ARstyles from './../ActionRow/ActionRow.module.scss';
import { ButtonEl } from '../../../../shared/ui/ButtonEl';
import {
	PlaylistMode,
	SquareDiv,
	useAction,
	usePlaylist,
	useTypedSelector,
} from '../../../../shared';
import { TrackContext } from '../TrackItem';
import { PlaylistModal } from '../../../../widgets/PlaylistModal';
import { useDispatch } from 'react-redux';

const popperId = 'actionMenu';
interface IActionMenuProps {
	addToPlaylist: (playlistId: string) => void;
}
export const ActionMenu: FC<IActionMenuProps> = ({ addToPlaylist }) => {
	// hooks
	const { _playlist } = useAction();
	const { track } = useContext(TrackContext);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [isExpand, setExpandList] = useState<boolean>(false);
	const { userPlaylists: playlists } = useTypedSelector(i => i.account);
	const playlist = usePlaylist();
	const dispatch = useDispatch();

	const open = Boolean(anchorEl);

	// handlers
	const handlePopoverClose = () => setAnchorEl(null);
	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleExpandList = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setExpandList(true);
	};
	const openModal = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		dispatch(_playlist.addToCurrentPlaylist(track));
		playlist.open(PlaylistMode.Create);
	};

	return (
		<>
			<SquareDiv
				size={30}
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
				aria-describedby={popperId}>
				<MoreHorizRounded className={ARstyles.actionIcons} />
				<Popper
					id={popperId}
					open={open}
					anchorEl={anchorEl}
					nonce={undefined}
					onResize={undefined}
					onResizeCapture={undefined}
					placement='bottom-end'>
					<Box className={styles.dropdown_box}>
						<ButtonEl
							endIcon={<ExpandMoreRounded className={ARstyles.actionIcons} />}
							className={styles.menuBtn}
							onMouseEnter={handleExpandList}>
							Добавить в плейлист
						</ButtonEl>
						{isExpand && (
							<>
								<ButtonEl
									startIcon={<AddRounded className={ARstyles.actionIcons} />}
									className={styles.menuBtn}
									onClick={openModal}>
									Новый плейлист
								</ButtonEl>

								{playlists &&
									playlists.map(pl => {
										const handleAddToPlaylist = () => {
											console.log('Добавить трек в существующий лист');
										};
										return (
											<ButtonEl
												key={pl.id}
												className={styles.menuBtn}
												onClick={handleAddToPlaylist}>
												{pl.name}
											</ButtonEl>
										);
									})}
							</>
						)}
					</Box>
				</Popper>
			</SquareDiv>
		</>
	);
};
