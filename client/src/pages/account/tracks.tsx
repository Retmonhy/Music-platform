import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAction, useTypedSelector } from '../../shared';
import { TrackList } from '../tracks/components';
import { AccountLayout, ContentBlock } from './components';
import { NextThunkDispatch } from '../../shared/store';
import { Loader } from '../../shared/ui/Loader';

const AccountTracks = () => {
	const { isLoading, userTracks } = useTypedSelector(i => i.account);
	const dispatch = useDispatch() as NextThunkDispatch;
	const { _account } = useAction();
	useEffect(() => {
		dispatch(_account.fetchUserMusic());
	}, []);
	return (
		<AccountLayout>
			<ContentBlock header='Моя музыка'>
				<div>Тут будут треки</div>
				пока треков нету нужно будет выводить информацию об этом и предлагать
				загрузить трек
				{isLoading ? <Loader /> : <TrackList tracks={userTracks} />}
			</ContentBlock>
		</AccountLayout>
	);
};
export default AccountTracks;
