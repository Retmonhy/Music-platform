import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { FC } from 'react';
interface H1Props {
	children: string;
}
export const H1: FC<H1Props> = ({ children }) => {
	return <h1 className='h1'>{children}</h1>;
};
