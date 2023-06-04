import React, { FC, ReactNode, useEffect } from 'react';
import { H1, useTypedSelector } from '@shared';
import { LeftSideMenu } from './LeftSideMenu';
import { useRouter } from 'next/router';

interface IAccountLayoutProps {
	children: ReactNode;
}
export const AccountLayout: FC<IAccountLayoutProps> = ({ children }) => {
	const { routes } = useTypedSelector(i => i.account);
	const router = useRouter();
	const { isAuth } = useTypedSelector(i => i.account);
	useEffect(() => {
		if (!isAuth) {
			router.push('/account/login');
		}
	}, []);
	return (
		<>
			<H1>Мой профиль</H1>
			<div>
				<LeftSideMenu list={routes} />
				{children}
			</div>
		</>
	);
};
