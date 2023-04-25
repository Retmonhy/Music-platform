import { Box, Grid, Skeleton } from '@mui/material';
import { FC } from 'react';

interface ITrackListSkeletonProps {
	amount: number;
}
export const TrackListSkeleton: FC<ITrackListSkeletonProps> = ({ amount }) => {
	const skeletons = [];
	for (let i = 0; i < amount; i++) {
		skeletons.push('skeleton' + i);
	}
	return (
		<>
			{skeletons.map(i => (
				<TrackItemSkeleton key={i} />
			))}
		</>
	);
};
export const TrackItemSkeleton = () => {
	return (
		<Grid
			container
			direction='row'
			alignItems='center'
			style={{ height: '94px', padding: '12px' }}>
			<Skeleton
				animation='wave'
				variant='rounded'
				width='70px'
				height='70px'
				sx={{ marginRight: '10px' }}
			/>
			<Box>
				<Skeleton variant='text' width='200px' animation='wave' />
				<Skeleton variant='text' width='150px' animation='wave' />
			</Box>
		</Grid>
	);
};

export const PlaylistItemSkeleton = () => {
	return (
		<>
			<Skeleton
				animation='wave'
				variant='rounded'
				width='200px'
				height='200px'
			/>
			<Box>
				<Skeleton variant='text' width='200px' animation='wave' />
				<Skeleton variant='text' width='150px' animation='wave' />
			</Box>
		</>
	);
};
interface IPlaylistListSkeletonProps {
	amount: number;
}
export const PlaylistListSkeleton: FC<IPlaylistListSkeletonProps> = ({
	amount,
}) => {
	const skeletons = [];
	for (let i = 0; i < amount; i++) {
		skeletons.push('skeleton' + i);
	}
	return (
		<>
			{skeletons.map(i => (
				<PlaylistItemSkeleton key={i} />
			))}
		</>
	);
};
