import { Box, Card, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import mainStore, { NextThunkDispatch, wrapper } from '../../store';

import { TrackList } from './components';
import { fetchTracks } from '../../store/ActionCreators/track';
import { useAction } from '../../shared';
import { useDispatch } from 'react-redux';

const Index: React.FC = () => {
	const { tracks, error } = useTypedSelector(st => st.track);
	const dispatch = useDispatch() as NextThunkDispatch;
	const { fetchUserPlaylists } = useAction()._account;
	useEffect(() => {
		dispatch(fetchUserPlaylists());
	}, []);
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
						</Grid>
					</Box>
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
		//добавлено чтобы не было ошибки TS
		return {
			props: {},
		};
	},
);
