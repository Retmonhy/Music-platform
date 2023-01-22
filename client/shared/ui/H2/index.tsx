import { Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FC } from 'react';
interface H2Props {
	children: string;
}
const theme = createTheme({
	components: {
		MuiTypography: {
			styleOverrides: {
				h2: {
					'&.MuiTypography-h2': {
						marginBottom: 20,
						fontSize: 26,
					},
				},
			},
		},
	},
});
export const H2: FC<H2Props> = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<Typography variant='h2' fontSize={26} mb={3}>
				{children}
			</Typography>
		</ThemeProvider>
	);
};
