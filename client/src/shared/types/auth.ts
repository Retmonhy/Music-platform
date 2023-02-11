export enum AccountRoutes {
	Login = '/account/login',
	Profile = '/account/profile',
	Tracks = '/account/tracks',
	Playlists = '/account/playlists',
	Musition = '/account/musition',
}
export enum RegistrationModes {
	REG = 'registration',
	LOGIN = 'login',
}

export interface TabPanelProps {
	children?: React.ReactNode;
	index: RegistrationModes;
	value: RegistrationModes;
}
export interface IRegistrationData {
	firstname: string;
	surname: string;
	email: string;
	password: string;
}
export interface ILoginData {
	email: string;
	password: string;
}
export interface IUpdateData {
	email: string;
	firstname: string;
	surname: string;
}
