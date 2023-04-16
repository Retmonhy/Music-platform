import { Grid } from '@mui/material';
import { IPlaylist } from '@shared';
import { FC } from 'react';
import { PlaylistItem } from 'src/pages/account/components';

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
