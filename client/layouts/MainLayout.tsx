import { Navbar, Player } from '../components';
import { Container } from '@mui/material';

const MainLayout = ({ children }) => {
	return (
		<>
			<Navbar />
			<Container style={{ margin: '90px 0' }}>
				{children}
				{/* <Box sx={{ p: 10 }}>fsfsdfsdsf</Box> */}
			</Container>
			<Player />
		</>
	);
};
export default MainLayout;
