import React, { FC, ReactNode } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { H1, useTypedSelector } from '../../../shared';
import { LeftSideMenu } from './LeftSideMenu';

interface IAccountLayoutProps {
	children: ReactNode;
}
export const AccountLayout: FC<IAccountLayoutProps> = ({ children }) => {
	const { routes } = useTypedSelector(i => i.account);
	return (
		<MainLayout>
			<H1>Мой профиль</H1>
			<div className='content'>
				<LeftSideMenu list={routes} />
				{children}
			</div>
		</MainLayout>
	);
};
