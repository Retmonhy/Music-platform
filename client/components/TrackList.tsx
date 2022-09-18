import { ITrack } from '../types/track';
import { Box, Button, Card, Grid } from '@material-ui/core';
import { TrackItem } from './TrackItem';

interface TrackListProps {
	tracks: ITrack[];
}
export const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
	return (
		<Grid container direction='column'>
			<Box p={2}>
				{tracks.map(track => {
					return <TrackItem key={track._id} track={track} />;
				})}
			</Box>
		</Grid>
	);
};
