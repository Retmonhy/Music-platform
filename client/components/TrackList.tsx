import { ITrack } from '../types/track';
import { Box, Button, Card, Grid } from '@material-ui/core';
import { TrackItem } from './TrackItem';
import { useTypedSelector } from '../shared/hooks';

interface TrackListProps {
	tracks: ITrack[];
}
export const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
	const { active } = useTypedSelector(st => st.player);
	return (
		<Grid container direction='column'>
			<Box p={2}>
				{tracks.map(track => {
					return (
						<TrackItem
							key={track._id}
							track={track}
							isActive={track._id === active?._id}
						/>
					);
				})}
			</Box>
		</Grid>
	);
};
