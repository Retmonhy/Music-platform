//libs
import { styled, useTheme } from '@mui/material/styles';
import { ListItemText, IconButton, Typography } from '@mui/material';
import { Box, Drawer, CssBaseline, Toolbar, List } from '@mui/material';
import { Divider, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
	ChevronRight,
	ChevronLeft,
	Menu,
	Inbox,
	Mail,
} from '@mui/icons-material';

import * as React from 'react';
import { useRouter } from 'next/router';
import { AccountRoutes, useTypedSelector } from '../shared';

const drawerWidth = 240;

const menuElements = [
	{ name: 'Главная', href: '/', id: 'main' },
	{ name: 'Список треков', href: '/tracks', id: 'tracks' },
	{ name: 'Список альбомов', href: '/albums', id: 'albums' },
	{ name: 'Аутентификация', href: AccountRoutes.Login, id: 'login' },
	{
		name: 'Мой профиль',
		href: AccountRoutes.Profile,
		id: 'profile',
	},
];

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
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export const Navbar: React.FC = () => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const router = useRouter();
	const { isAuth } = useTypedSelector(i => i.account);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position='fixed' open={open}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						sx={{ mr: 2, ...(open && { display: 'none' }) }}>
						<Menu />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						Persistent drawer
					</Typography>
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
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{menuElements.map(({ name, href, id }, index) => {
						if (id === 'profile') {
							href = isAuth ? href : AccountRoutes.Login;
						}
						return (
							<ListItem key={name} disablePadding>
								<ListItemButton onClick={() => router.push(href)}>
									<ListItemIcon>
										{index % 2 === 0 ? <Inbox /> : <Mail />}
									</ListItemIcon>
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
