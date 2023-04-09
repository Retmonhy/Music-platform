import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Grid, TextField } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { useInput } from '@shared/hooks';
import {
	api,
	generateUrl,
	TrackEndpoints,
	ICommentResponse,
} from '@shared/api';
import { ITrack } from '@shared/types';

const TrackPage = ({ serverTrack }) => {
	const [track, setTrack] = React.useState<ITrack>(serverTrack);
	const router = useRouter();
	const username = useInput();
	const text = useInput();

	const sendComment = async () => {
		try {
			const { data } = await api.post<ICommentResponse>(
				TrackEndpoints.POST_COMMENT,
				{
					username: username.value,
					text: text.value,
					trackId: track._id,
				},
			);
			if (data.isSuccess) {
				setTrack({ ...track, comments: [...track.comments, data.comment] });
			}
		} catch (error) {
			console.log('[id].ts sendComment ERROR = ', error);
		}
	};

	return (
		// <MainLayout
		// 	title={`${track.artist} - ${track.name} Музыкальная площадка`}
		// 	keywords={`музыка, артисты, песня, слушать, ${track.name}, ${track.artist}`}>
		<>
			<Button variant='outlined' onClick={() => router.push('/tracks')}>
				К списку
			</Button>
			<Grid container>
				<Image src={generateUrl(track.picture)} width={200} height={200} />
				<div>
					<h1>Название трека - {track.name}</h1>
					<h1>Исполнитель - {track.artist}</h1>
					<h1>Прослушиваний {track.listens}</h1>
				</div>
			</Grid>
			<h1>Слова песни</h1>
			<p>{track.text}</p>
			<Grid container>
				<TextField label='Ваше имя' {...username} fullWidth />
				<TextField
					label='Комментарий'
					{...text}
					fullWidth
					multiline
					minRows={4}
				/>
				<Button onClick={sendComment}>Отправить</Button>
			</Grid>
			<div>
				{track.comments.map(comment => {
					return (
						<div key={comment._id}>
							<div>Автор - {comment.username}</div>
							<div>Комментарий - {comment.text}</div>
						</div>
					);
				})}
			</div>
		</>
		// </MainLayout>
	);
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { data } = await api.get(`/tracks/${params.id}`);
	return {
		props: {
			serverTrack: data,
		},
	};
};
