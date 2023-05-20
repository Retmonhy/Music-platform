import { HomeRounded, LoginRounded, PersonRounded, LibraryMusicRounded, QueueMusicRounded } from '@mui/icons-material';
import { Local } from './Localization';
import { AccountRoutes } from './AccountRoutes';

export const MenuElements = [
	{ name: Local.NavMenu.Main, href: '/', id: 'main', icon: <HomeRounded /> },
	{
		name: Local.NavMenu.TrackList,
		href: '/tracks',
		id: 'tracks',
		icon: <LibraryMusicRounded />,
	},
	{
		name: Local.NavMenu.PlaylistList,
		href: '/playlists',
		id: 'playlists',
		icon: <QueueMusicRounded />,
	},
	{
		name: Local.NavMenu.Authentification,
		href: AccountRoutes.Login,
		id: 'login',
		icon: <LoginRounded />,
	},
	{
		name: Local.NavMenu.Profile,
		href: AccountRoutes.Profile,
		id: 'profile',
		icon: <PersonRounded />,
	},
];
