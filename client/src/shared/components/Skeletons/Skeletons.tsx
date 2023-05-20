import { Box, Grid, Skeleton } from '@mui/material';
import { useWindowSize } from '@shared';
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
	const windowSize = useWindowSize();
	let size = '200px';
	let flexBasis = '25%';
	if (windowSize.width < 992) {
		size = '180px';
		flexBasis = '33.33%';
	}
	if (windowSize.width < 530) {
		size = '140px';
		flexBasis = '50%';
	}

	return (
		<Box flexBasis={flexBasis} mb={2} padding={0.5}>
			<Skeleton animation='wave' variant='rounded' width={size} height={size} />
			<Box>
				<Skeleton variant='text' width='140px' animation='wave' />
				<Skeleton variant='text' width='100px' animation='wave' />
			</Box>
		</Box>
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
		<Grid container flexWrap='wrap'>
			{skeletons.map(i => (
				<PlaylistItemSkeleton key={i} />
			))}
		</Grid>
	);
};
