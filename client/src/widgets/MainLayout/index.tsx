import { Container } from '@mui/material';
import Head from 'next/head';
import { Navbar } from '../Navbar';

interface IMainLayoutProps {
	children: React.ReactNode;
	title?: string;
	description?: string;
	keywords?: string;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({
	children,
	title,
	description,
	keywords,
}) => {
	return (
		<>
			<Head>
				<title>{title || 'Музыкальная площадка'}</title>
				<meta
					name='description'
					content={`Музыкальная площадка. Послушать музыку бесплатно. ${description}`}
				/>
				<meta name='robots' content={'index, follow'} />
				<meta
					name='keywords'
					content={keywords || 'Музыка, скачать музыку, слушать, песни, песня'}
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<Navbar />
			<Container style={{ margin: '90px auto' }}>{children}</Container>
		</>
	);
};
