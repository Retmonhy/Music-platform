import React, { FC, createContext, useCallback } from 'react';

import { Box } from '@mui/material';
import { PlaylistMode, PlaylistService } from '@shared';
import { useAction, usePlayerControl, useAppDispatch, usePlaylist } from '@shared/hooks';
import { PlaylistImage, PlaylistInfo } from './components';
import { PlaylistContext } from './lib/helpers';
import { IPlaylist } from './model/types';

interface IPlaylistItemProps {
	item: IPlaylist;
}

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
	const playPlaylist = useCallback(() => {
		const playlistTracks = PlaylistService.fetchPlaylistTracks(item.id);
		playlistTracks.then(result => {
			const { data: tracks } = result;
			if (tracks.length > 0) {
				dispatch(_player.setCurrentPlaylist({ tracks, currentTrack: tracks[0] }));
				dispatch(_player.setActive(tracks[0]));
				dispatch(playControl);
			}
		});
	}, [item.id]);
	return (
		<PlaylistContext.Provider value={item}>
			<Box data-id={item.id} className='playlist'>
				<Box className='playlist__container'>
					<Box className='image'>
						<PlaylistImage
							className='image'
							source={item.cover}
							alt={`Обложка плейлиста ${item.name}`}
							handlers={{
								onEdit: editPlaylist,
								onPlay: playPlaylist,
							}}
						/>
					</Box>
					<PlaylistInfo title={item.name} description={item.owner.fullname} titleClick={navigateToPlaylist} />
				</Box>
			</Box>
		</PlaylistContext.Provider>
	);
};
