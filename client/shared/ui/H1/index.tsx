import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { FC } from 'react';
interface H1Props {
	children: string;
}
const theme = createTheme({
	components: {
		MuiTypography: {
			styleOverrides: {
				h1: {
					'&.MuiTypography-h1': {
						marginBottom: 20,
						fontSize: 36,
					},
				},
			},
		},
	},
});
export const H1: FC<H1Props> = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<Typography variant='h1'>{children}</Typography>
		</ThemeProvider>
	);
};
