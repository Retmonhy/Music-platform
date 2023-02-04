import React from 'react';
import { Loader } from '../../components/Loader';
import MainLayout from '../../layouts/MainLayout';
import { useTypedSelector } from '../../shared';
import { AccountLayout, ContentBlock } from './components';

const AccountTracks = () => {
	const { isLoading } = useTypedSelector(i => i.track);
	return (
		<AccountLayout>
			{isLoading ? (
				<Loader />
			) : (
				<ContentBlock header='Моя музыка'>
					<div>Тут будут треки</div>
					пока треков нету нужно будет выводить информацию об этом и предлагать
					загрузить трек
				</ContentBlock>
			)}
		</AccountLayout>
	);
};
export default AccountTracks;
