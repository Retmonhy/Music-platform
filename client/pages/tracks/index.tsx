import { Box, Card, Grid } from '@material-ui/core';
import React from 'react';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';

import { TrackList } from './components';
import { fetchTracks } from '../../store/ActionCreators/track';

const Index: React.FC = () => {
	const { tracks, error } = useTypedSelector(st => st.track);
	if (error) {
		return (
			<MainLayout>
				<h1>{error}</h1>
			</MainLayout>
		);
	}
	return (
		<MainLayout title={'Список треков - музыкальная площадка'}>
			<Grid container justifyContent='center'>
				<Card style={{ width: '900px' }}>
					<Box p={3}>
						<Grid container justifyContent='space-between'>
							<h1>Список треков</h1>
							{/* <Button onClick={() => router.push('/tracks/create')}>
								Загрузить
							</Button> */}
						</Grid>
					</Box>
					{/* <TextField fullWidth value={query} onChange={seacrh} /> */}
					<TrackList tracks={tracks} />
				</Card>
			</Grid>
		</MainLayout>
	);
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
	store => async () => {
		const dispatch = store.dispatch as NextThunkDispatch;
		await dispatch(fetchTracks());
		return { props: {} };
	},
);
