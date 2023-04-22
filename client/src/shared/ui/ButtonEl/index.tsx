import { Button, ButtonProps, createTheme, ThemeProvider } from '@mui/material';
import { FC, ReactNode } from 'react';
interface IButtonEl extends ButtonProps {
	children: ReactNode;
}
const theme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'inherit',
					color: '#333',
				},
			},
		},
	},
});
export const ButtonEl: FC<IButtonEl> = ({ children, ...props }) => {
	return (
		<ThemeProvider theme={theme}>
			<Button {...props}>{children}</Button>
		</ThemeProvider>
	);
};
