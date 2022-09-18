import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import { Button, Grid, TextField } from '@material-ui/core';

const TrackPage = () => {
	const track = {
		_id: 'ae233d68-a923-4eb3-a0e3-524975422b67',
		name: 'BestTrack 2',
		artist: 'Alyosha 2',
		text: 'Description 2',
		listens: 2,
		audio: 'ae233d68-a923-4eb3-a0e3-524975422b67.mp3',
		picture: '36ac72ba-0c4d-4063-8bcb-7398b28d682a.jpg',
		comments: [],
	};
	const router = useRouter();
	return (
		<MainLayout>
			<Button variant='outlined' onClick={() => router.push('/tracks')}>
				К списку
			</Button>
			<Grid container>
				<img src={track.picture} width={200} />
				<div>
					<h1>Нахвание трека - {track.name}</h1>
					<h1>Исполнитель - {track.artist}</h1>
					<h1>Прослушиваний {track.listens}</h1>
				</div>
			</Grid>
			<h1>Слова песни</h1>
			<p>{track.text}</p>
			<Grid container>
				<TextField label='Ваше имя' fullWidth />
				<TextField label='Комментарий' fullWidth multiline rows={4} />
				<Button>Отправить</Button>
			</Grid>
			<div>
				{track.comments.map(comment => {
					return (
						<div key={comment._id}>
							<div>Автор - {comment.author}</div>
							<div>Комментарий - {comment.text}</div>
						</div>
					);
				})}
			</div>
		</MainLayout>
	);
};

export default TrackPage;
