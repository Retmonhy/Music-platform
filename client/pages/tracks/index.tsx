import { Box, Button, Card, Grid, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { ChangeEvent } from 'react';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';

import { TrackList } from './components';
import { useDispatch } from 'react-redux';
import { useAction } from '../../shared';
import { fetchTracks } from '../../store/ActionCreators/track';

const Index: React.FC = () => {
	const router = useRouter();
	const [query, setQuery] = React.useState<string>('');
	const [timer, setTimer] = React.useState(null);
	const { tracks, error } = useTypedSelector(st => st.track);
	const { _track } = useAction();

	const dispatch = useDispatch() as NextThunkDispatch;
	const seacrh = async (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		if (timer) {
			clearTimeout(timer);
		}
		setTimer(
			setTimeout(async () => {
				dispatch(await _track.searchTracks(e.target.value));
			}, 500),
		);
	};

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
							<Button onClick={() => router.push('/tracks/create')}>
								Загрузить
							</Button>
						</Grid>
					</Box>
					<TextField fullWidth value={query} onChange={seacrh} />
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
		await dispatch(await fetchTracks());
	},
);
