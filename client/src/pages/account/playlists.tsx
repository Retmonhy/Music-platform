import { AccountLayout, ContentBlock } from './components';
import React, { FC, ReactNode, useState } from 'react';
import { H2 } from './../../shared';
import { PlaylistItem } from './components';
import { Box, Button } from '@mui/material';
import { PlaylistModal } from '../tracks/components';
import { IPlaylistPayload } from '../../widgets/PlaylistModal/model';
import { createPlaylistReq } from '../../shared/api/services/playlist.service';
interface IPlaylistProps {}

const data = [
	{
		title: 'Попса / Реп',
		id: 'string',
		creator: 'Dima Kuleshov',
		numberOfTracks: 124,
		lastUpdate: Date.now(),
		preview: '/image/9fad3e6e-c8c5-48cc-8c0a-f5a53275b360.jpg',
	},
	{
		title: 'Кей поп музыка',
		id: 'string1',
		creator: 'Dima Kuleshov',
		numberOfTracks: 102,
		lastUpdate: Date.now(),
		preview: '/image/9fad3e6e-c8c5-48cc-8c0a-f5a53275b360.jpg',
	},
	{
		title: 'Русский рок',
		id: 'string2',
		creator: 'Dima Kuleshov',
		numberOfTracks: 12,
		lastUpdate: Date.now(),
		preview: '/image/9fad3e6e-c8c5-48cc-8c0a-f5a53275b360.jpg',
	},
];

const createlaylistHandler = async (payload: IPlaylistPayload) => {
	const form = new FormData();
	form.append('name', payload.name);
	form.append('description', payload.description);
	form.append('cover', JSON.stringify(payload.file));
	form.append('tracks', JSON.stringify(payload.tracks));
	const { data } = await createPlaylistReq(form);
};

const Playlist: FC<IPlaylistProps> = () => {
	const [isVisible, setVisible] = useState<boolean>(false);

	return (
		<AccountLayout>
			<ContentBlock header='Мои плейлисты'>
				<Button
					onClick={() => {
						setVisible(true);
					}}>
					Open modal
				</Button>
				<PlaylistWrapper>
					{data.map(playlist => (
						<PlaylistItem key={playlist.id} item={playlist} />
					))}
				</PlaylistWrapper>
			</ContentBlock>
			<PlaylistModal
				isVisible={isVisible}
				onClose={() => setVisible(false)}
				onSave={createlaylistHandler}
			/>
		</AccountLayout>
	);
};
export default Playlist;

interface IPlaylistWrapper {
	children: ReactNode;
}
const PlaylistWrapper: FC<IPlaylistWrapper> = ({ children }) => {
	return <Box style={{ padding: '20px', display: 'flex' }}>{children}</Box>;
};
