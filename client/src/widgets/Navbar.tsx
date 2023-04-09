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
	HomeRounded,
	LibraryMusicRounded,
	LoginRounded,
	PersonRounded,
	QueueMusicRounded,
} from '@mui/icons-material';

import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { AccountRoutes, useTypedSelector } from '@shared';
import { Player } from './Player';

const drawerWidth = 280;

const menuElements = [
	{ name: 'Главная', href: '/', id: 'main', icon: <HomeRounded /> },
	{
		name: 'Список треков',
		href: '/tracks',
		id: 'tracks',
		icon: <LibraryMusicRounded />,
	},
	{
		name: 'Список плейлистов',
		href: '/playlists',
		id: 'playlists',
		icon: <QueueMusicRounded />,
	},
	{
		name: 'Аутентификация',
		href: AccountRoutes.Login,
		id: 'login',
		icon: <LoginRounded />,
	},
	{
		name: 'Мой профиль',
		href: AccountRoutes.Profile,
		id: 'profile',
		icon: <PersonRounded />,
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
						<Typography variant='h6' noWrap component='div'>
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
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{menuElements.map(({ name, href, id, icon }) => {
						if (id === 'profile' && !user) return null;
						if (id === 'login' && user) return null;
						const handleClick = () => {
							router.push(href);
							setOpen(false);
						};
						return (
							<ListItem key={name} disablePadding>
								<ListItemButton onClick={handleClick}>
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
