import React, { FC } from 'react';

import { Box } from '@mui/material';
import {
	IPlaylist,
	MusicInfo,
	PlaylistMode,
	useAction,
	usePlaylist,
} from '../../../shared';
import { PlaylistImage } from './PlaylistImage';
import { SquareDiv } from '../../../shared/ui';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../../../shared/store';

interface IPlaylistItemProps {
	item: IPlaylist;
}
const imageSize = '200px';

export const PlaylistItem: FC<IPlaylistItemProps> = ({ item }) => {
	const dispatch = useDispatch() as NextThunkDispatch;
	const { loadState } = useAction()._playlist;
	const { open } = usePlaylist();
	const navigateToPlaylist = () => {};
	const editPlaylist = () => {
		dispatch(loadState(item)).then(() => {
			open(PlaylistMode.Edit);
		});
	};
	const playPlaylist = () => {};
	return (
		<Box flexBasis={'33.33%'}>
			<Box padding={'8px'}>
				<SquareDiv size={imageSize}>
					<PlaylistImage
						source={item.cover}
						alt={item.cover}
						size={imageSize}
						onEdit={editPlaylist}
						onPlay={playPlaylist}
					/>
				</SquareDiv>
				<MusicInfo
					title={item.name}
					description={item.owner_id}
					titleClick={navigateToPlaylist}
				/>
			</Box>
		</Box>
	);
};
