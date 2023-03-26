import { Typography } from '@material-ui/core';
import { H1 } from '../shared';
import { MainLayout } from '../widgets';

const Index = () => {
	return (
		<>
			<H1>Главная страница</H1>
			<Typography style={{ fontSize: '24px' }}>
				Здесь вы можете поделиться своими треками или послушать любимые треки
				других людей.
			</Typography>
		</>
	);
};
export default Index;
