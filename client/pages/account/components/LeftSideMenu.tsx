import { Box, Card, Link } from '@material-ui/core';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from '../styles/Profile.module.scss';
interface IMenuItem {
	name: string;
	isSelected: boolean;
	href: string;
}
interface ILeftSideMenuProps {
	list: IMenuItem[];
}
export const LeftSideMenu: FC<ILeftSideMenuProps> = ({ list }) => {
	const router = useRouter();
	return (
		<Box className={styles.menu}>
			<Box className={styles.menuWrapper}>
				<ul className={styles.menuList}>
					{list.map(item => {
						return (
							<li
								className={
									item.isSelected
										? [styles.listItem, styles.listItemSelected].join(' ')
										: [styles.listItem].join(' ')
								}
								key={item.name}>
								<Link href={`${item.href}`}>{item.name}</Link>
							</li>
						);
					})}
				</ul>
			</Box>
		</Box>
	);
};
