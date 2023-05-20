import { FC } from 'react';
import { Grid } from '@mui/material';
import { IPlaylist } from './model/types';
import { PlaylistItem } from './PlaylistItem';

interface IPlaylistListProps {
	playlists: IPlaylist[];
}

export const PlaylistList: FC<IPlaylistListProps> = ({ playlists }) => {
	return (
		<Grid container flexWrap='wrap'>
			{playlists.map(playlist => (
				<PlaylistItem key={playlist.id} item={playlist} />
			))}
		</Grid>
	);
};
