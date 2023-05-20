//libs
import { styled, useTheme } from '@mui/material/styles';
import { ListItemText, IconButton, Typography } from '@mui/material';
import { Box, Drawer, CssBaseline, Toolbar, List } from '@mui/material';
import { Divider, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { ChevronRight, ChevronLeft, Menu } from '@mui/icons-material';

import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { useTypedSelector } from '@shared';
import { Player } from './Player';
import { MenuElements } from '@shared/const';

const drawerWidth = 280;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export const Navbar: FC = () => {
	const { user } = useTypedSelector(i => i.account);
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const { active } = useTypedSelector(i => i.player);
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position='fixed' open={open}>
				<Toolbar style={{ minHeight: '48px' }}>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						sx={{ mr: 2, ...(open && { display: 'none' }) }}>
						<Menu />
					</IconButton>
					<>
						<Typography variant='h6' noWrap component='div' className={active ? 'navbar__name' : ''}>
							UpMusic
						</Typography>
						<Player />
					</>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant='persistent'
				anchor='left'
				open={open}>
				<DrawerHeader style={{ minHeight: '50px' }}>
					<IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{MenuElements.map(({ name, href, id, icon }) => {
						if (id === 'profile' && !user) return null;
						if (id === 'login' && user) return null;
						const handleClick = () => {
							router.push(href);
							setOpen(false);
						};
						return (
							<ListItem key={name} disablePadding>
								<ListItemButton onClick={handleClick} className='navbar__item'>
									<ListItemIcon>{icon}</ListItemIcon>
									<ListItemText primary={name} />
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
				<Divider />
			</Drawer>
		</Box>
	);
};
