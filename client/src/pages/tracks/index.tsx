import React, { useEffect, useState } from 'react';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { TrackList } from './components';
import { H1, useAction, useIntersect, usePlaylist } from '@shared';
import { PlaylistModal } from '../../widgets';
import { Intersect } from '@shared/ui';
import { TrackListSkeleton } from '@shared/ui/Skeletons';
import { Local } from '@shared/helper/localization';
import { getIsSsrMobile } from '@shared/helper/getIsSsrMobile';
import { GetServerSidePropsContext } from 'next/types';
const pageSize = 10;

const TrackPage: React.FC = () => {
	const { _track } = useAction();
	const { tracks, error, isLoading } = useTypedSelector(st => st.track);
	const { onIntersect: fetchTracks } = useIntersect(
		_track.fetchTracks,
		pageSize,
	);
	const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true);
	useEffect(() => {
		fetchTracks().finally(() => {
			setIsFirstRequest(false);
		});
	}, []);
	const playlist = usePlaylist();
	return (
		<>
			<H1>{Local.Tracks.PageTitle}</H1>
			{error ? <H1>{error}</H1> : null}
			{isFirstRequest ? (
				<TrackListSkeleton amount={10} />
			) : (
				<Intersect
					onIntersect={fetchTracks}
					id='track_intersection'
					isFetching={isLoading}>
					<TrackList tracks={tracks} />
				</Intersect>
			)}
			<PlaylistModal
				isVisible={playlist.isVisible}
				control={playlist.control}
				handlers={{
					onClose: playlist.close,
					onSave: playlist.onSave,
					onUpload: playlist.onUpload,
				}}
			/>
		</>
	);
};

export default TrackPage;

// export const getServerSideProps = wrapper.getServerSideProps(
// 	store => async () => {
// 		const dispatch = store.dispatch as NextThunkDispatch;
// 		const { _track } = useAction();
// 		dispatch(_track.fetchTracks());
// 		//добавлено чтобы не было ошибки TS
// 		return {
// 			props: {},
// 		};
// 	},
// );

export async function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {
			isSsrMobile: getIsSsrMobile(context),
		},
	};
}
