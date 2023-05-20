import { AddRounded, ExpandMoreRounded, MoreHorizRounded } from '@material-ui/icons';
import { Box, Popper } from '@mui/material';
import React, { MouseEvent, FC, useContext, useState, memo } from 'react';
import { ButtonEl } from '@shared/ui/ButtonEl/ButtonEl';
import { ManageAction, PlaylistMode, SquareDiv, useAction, usePlaylist, useTypedSelector } from '@shared';
import { TrackContext } from '../TrackItem';
import { useAppDispatch } from '@shared/store';
import { CheckboxButton } from '../CheckboxButton/CheckboxButton';
import { Local } from '@shared/const/Localization';

const popperId = 'actionMenu';
interface IActionMenuProps {}
export const ActionMenu: FC<IActionMenuProps> = memo(() => {
	// hooks
	const { _playlist } = useAction();
	const { track } = useContext(TrackContext);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [isExpand, setExpandList] = useState<boolean>(false);
	const { userPlaylists: playlists } = useTypedSelector(i => i.playlists);
	const { user } = useTypedSelector(i => i.account);
	const playlist = usePlaylist();
	const dispatch = useAppDispatch();

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
	const showAllPlaylists = () => {};

	return (
		<>
			<SquareDiv size={30} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} aria-describedby={popperId}>
				<MoreHorizRounded className='icon-button' />
				<Popper
					id={popperId}
					open={open}
					anchorEl={anchorEl}
					nonce={undefined}
					onResize={undefined}
					onResizeCapture={undefined}
					placement='bottom-end'
					className='action-menu'>
					<Box className='action-menu__dropdown'>
						<ButtonEl endIcon={<ExpandMoreRounded className='icon-button' />} className='action-menu__btn' onMouseEnter={handleExpandList}>
							{Local.Tracks.AddToPlaylist}
						</ButtonEl>
						{isExpand && (
							<>
								<ButtonEl startIcon={<AddRounded className='icon-button' />} className='action-menu__btn' onClick={openModal}>
									{Local.Tracks.NewPlaylist}
								</ButtonEl>

								{playlists &&
									playlists
										.filter(i => i.owner.id === user.id)
										.map((pl, ind) => {
											if (ind > 2) {
												return;
											}
											const handleAddToPlaylist = () => {
												dispatch(
													_playlist.managePlaylistTracks({
														playlistId: pl.id,
														trackId: track._id,
														action: pl.tracks.includes(track._id) ? ManageAction.Remove : ManageAction.Add,
													}),
												);
											};
											return (
												<CheckboxButton
													key={pl.id}
													title={pl.name}
													className='action-menu__btn'
													isChecked={pl.tracks.includes(track._id)}
													onClick={handleAddToPlaylist}
												/>
											);
										})}
								<ButtonEl className='action-menu__btn' onClick={showAllPlaylists}>
									{Local.Tracks.ShowAll}
								</ButtonEl>
							</>
						)}
					</Box>
				</Popper>
			</SquareDiv>
		</>
	);
});
