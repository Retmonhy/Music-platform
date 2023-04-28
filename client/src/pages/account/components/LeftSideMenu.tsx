import { Box, Card, Link } from '@material-ui/core';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { merge, useAction } from '@shared';
import styles from '../styles/Profile.module.scss';
import { useAppDispatch } from '@shared/store';
interface IMenuItem {
	name: string;
	isSelected: boolean;
	href: string;
}
interface ILeftSideMenuProps {
	list: IMenuItem[];
}
export const LeftSideMenu: FC<ILeftSideMenuProps> = ({ list }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		_account: { changeRouteTo },
	} = useAction();
	const navigateToRoute = (route: string) => {
		router.push(route);
	};
	useEffect(() => {
		if (window) {
			dispatch(changeRouteTo(window.location.pathname));
		}
	}, []);
	return (
		<Box className='menu'>
			<Box className='menu__wrapper'>
				<ul className='menu__list'>
					{list.map(item => {
						return (
							<li
								className={
									item.isSelected ? 'list-item list-item_selected' : 'list-item'
								}
								key={item.name}>
								<Link onClick={() => navigateToRoute(item.href)}>
									{item.name}
								</Link>
							</li>
						);
					})}
				</ul>
			</Box>
		</Box>
	);
};
