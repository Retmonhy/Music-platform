import React, { useEffect } from 'react';
import { SearchTrack, TrackList } from '../tracks/components';
import { AccountLayout, ContentBlock } from './components';
import { useAction, useTypedSelector } from '@shared';
import { useAppDispatch } from '@shared/store';
import { TrackListSkeleton } from '@shared/ui/Skeletons';

const AccountTracks = () => {
	const { isLoading, userTracks, search_userTracks, isSearching, user } =
		useTypedSelector(i => i.account);
	const dispatch = useAppDispatch();
	const { _account } = useAction();
	useEffect(() => {
		dispatch(_account.fetchUserMusic());
	}, []);
	const searchHandler = (query: string) => {
		dispatch(_account.searchUserTracks({ query, owner_id: user.id }));
	};
	return (
		<AccountLayout>
			<ContentBlock header='Моя музыка'>
				<SearchTrack isSearching={isSearching} searchHandler={searchHandler} />
				{isLoading ? (
					<TrackListSkeleton amount={5} />
				) : search_userTracks && search_userTracks.length ? (
					<TrackList tracks={search_userTracks} />
				) : (
					<TrackList tracks={userTracks} />
				)}
			</ContentBlock>
		</AccountLayout>
	);
};

export default AccountTracks;
