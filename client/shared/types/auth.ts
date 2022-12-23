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
	name: string;
	surname: string;
	email: string;
	password: string;
}
export interface ILoginData {
	email: string;
	password: string;
}
