import React, { FC, createContext } from 'react';

import { Box } from '@mui/material';
import {
	IPlaylist,
	MusicInfo,
	PlaylistMode,
	PlaylistService,
	useAction,
	usePlayerControl,
	usePlaylist,
} from '@shared';
import { PlaylistImage } from './PlaylistImage';
import { SquareDiv } from '@shared/ui';
import { NextThunkDispatch, useAppDispatch } from '@shared/store';

interface IPlaylistItemProps {
	item: IPlaylist;
}
const imageSize = '200px';

export const PlaylistContext = createContext<IPlaylist | null>(null);

export const PlaylistItem: FC<IPlaylistItemProps> = ({ item }) => {
	const dispatch = useAppDispatch();
	const { _playlist } = useAction();
	const { open } = usePlaylist();
	const navigateToPlaylist = () => {};
	const editPlaylist = () => {
		dispatch(_playlist.loadState(item)).then(() => {
			open(PlaylistMode.Edit);
		});
	};
	const { _player } = useAction();
	const { playControl } = usePlayerControl();
	const playPlaylist = () => {
		const playlistTracks = PlaylistService.fetchPlaylistTracks(item.id);
		playlistTracks.then(result => {
			const { data: tracks } = result;
			if (tracks.length > 0) {
				dispatch(
					_player.setCurrentPlaylist({ tracks, currentTrack: tracks[0] }),
				);
				dispatch(_player.setActive(tracks[0]));
				dispatch(playControl);
			}
		});
	};
	return (
		<PlaylistContext.Provider value={item}>
			<Box flexBasis={'33.33%'} data-id={item.id}>
				<Box padding={'8px'}>
					<SquareDiv size={imageSize}>
						<PlaylistImage
							source={item.cover}
							alt={`Обложка плейлиста ${item.name}`}
							size={imageSize}
							handlers={{
								onEdit: editPlaylist,
								onPlay: playPlaylist,
							}}
						/>
					</SquareDiv>
					<MusicInfo
						title={item.name}
						description={item.owner.fullname}
						titleClick={navigateToPlaylist}
					/>
				</Box>
			</Box>
		</PlaylistContext.Provider>
	);
};
