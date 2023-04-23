import { Button } from '@mui/material';
import { H1 } from '@shared';
import { useRouter } from 'next/router';

const Custom404 = () => {
	const router = useRouter();
	const returnToMain = () => {
		router.replace('/');
	};
	return (
		<>
			<H1>404 - Page Not Found</H1>
			<Button onClick={returnToMain}>Вернуться на главную</Button>
		</>
	);
};
export default Custom404;
