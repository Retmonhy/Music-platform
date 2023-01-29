import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Loader } from '../../components/Loader';
import MainLayout from '../../layouts/MainLayout';
import { AuthRoutes, H1, StorageKeys, useTypedSelector } from '../../shared';
import { ContentBlock, LeftSideMenu } from './components';

const menuList = [
	{
		name: 'Личные данные',
		isSelected: true,
		href: AuthRoutes.Profile,
	},
	{
		name: 'Мои треки',
		isSelected: false,
		href: AuthRoutes.Tracks,
	},
	{
		name: 'Мои альбомы',
		isSelected: false,
		href: AuthRoutes.Alboms,
	},
];
const Account = () => {
	const { user, isLoading } = useTypedSelector(i => i.account);
	const router = useRouter();
	useEffect(() => {
		if (!user && !localStorage.getItem(StorageKeys.accessToken)) {
			router && router.push(AuthRoutes.Login);
		}
	}, [user]);
	return (
		<MainLayout>
			<H1>Мой профиль</H1>
			<div className='content'>
				<LeftSideMenu list={menuList} />
				{isLoading ? <Loader /> : <ContentBlock />}
			</div>
		</MainLayout>
	);
};
export default Account;
