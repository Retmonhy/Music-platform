import { Typography } from '@material-ui/core';
import MainLayout from '../layouts/MainLayout';
import { H1 } from '../shared';

const Index = () => {
	return (
		<MainLayout>
			<H1>Главная страница</H1>
			<Typography style={{ fontSize: '24px' }}>
				Здесь вы можете поделиться своими треками или послушать любимые треки
				других людей.
			</Typography>
		</MainLayout>
	);
};
export default Index;
