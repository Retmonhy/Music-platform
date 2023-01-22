import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { AuthRoutes, H1, useTypedSelector } from '../../shared';
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
	const { isAuth } = useTypedSelector(i => i.account);
	const router = useRouter();
	if (!isAuth) {
		router.push(AuthRoutes.Login);
	}
	return (
		<MainLayout>
			<H1>Мой профиль</H1>
			<div className='content'>
				<LeftSideMenu list={menuList} />
				<ContentBlock />
			</div>
		</MainLayout>
	);
};
export default Account;
