import { useContext } from 'react';
import { PlaylistContext } from '../helpers';

export const usePlaylistContext = () => {
	const playlistContext = useContext(PlaylistContext);
	return playlistContext;
};
