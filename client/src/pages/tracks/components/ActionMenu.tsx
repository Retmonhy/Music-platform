import { Button } from '@material-ui/core';
import { MoreHorizRounded } from '@material-ui/icons';
import { Popover } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { SquareDiv } from '../../../components';
import styles from '../../../shared/styles/TrackItem.module.scss';
export const ActionMenu = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const handlePopoverClose = () => setAnchorEl(null);
	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const open = Boolean(anchorEl);
	const [isPlaylistOpen, setPlaylistOpen] = useState<boolean>(false);
	const openPlaylist = () => {
		setPlaylistOpen(true);
	};
	useEffect(() => {
		//закрывается при размонтировании попап с плейлистом
		// return
	}, []);
	return (
		<SquareDiv
			size={30}
			onMouseEnter={handlePopoverOpen}
			onMouseLeave={handlePopoverClose}>
			<MoreHorizRounded className={styles.actionIcons} />
			<Popover
				classes={{ paper: styles.popover }}
				sx={{
					pointerEvents: 'none',
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}>
				<Button onMouseEnter={openPlaylist}>Добавить в плейлист</Button>
				{/* {some.map(item => {
					<Button onMouseEnter={openPlaylist}>Добавить в плейлист</Button>
				})} */}
				<div onMouseEnter={openPlaylist}>Добавить в плейлист</div>
			</Popover>
		</SquareDiv>
	);
};
