import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../../components/Loader';
import { useAction, useTypedSelector } from '../../shared';
import { NextThunkDispatch } from '../../store';
import { TrackList } from '../tracks/components';
import { AccountLayout, ContentBlock } from './components';

const AccountTracks = () => {
	const { isLoading, userTracks } = useTypedSelector(i => i.account);
	const dispatch = useDispatch() as NextThunkDispatch;
	const { _account } = useAction();
	useEffect(() => {
		dispatch(_account.fetchUserMusic());
	}, []);
	return (
		<AccountLayout>
			{isLoading ? (
				<Loader />
			) : (
				<ContentBlock header='Моя музыка'>
					<div>Тут будут треки</div>
					пока треков нету нужно будет выводить информацию об этом и предлагать
					загрузить трек
					<TrackList tracks={userTracks} />
				</ContentBlock>
			)}
		</AccountLayout>
	);
};
export default AccountTracks;
