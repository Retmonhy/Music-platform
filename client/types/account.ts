import { ILoginUserResponse } from './../shared/api/interface';
export enum AccountActionTypes {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	REFRESH = 'REFRESH',
	REGISTRATION = 'REGISTRATION',
	LOADING = 'LOADING',
}
export type AccountState = {
	refreshToken: string;
	accessToken: string;
	user: IUser;
	isLoading: boolean;
	isAuth: boolean;
};
export interface IUser {
	id: string;
	email: string;
	isActivated: boolean;
}

interface RegistrationAction {
	type: AccountActionTypes.REGISTRATION;
	payload: ILoginUserResponse;
}
interface LoginAction {
	type: AccountActionTypes.LOGIN;
	payload: ILoginUserResponse;
}
interface LogoutAction {
	type: AccountActionTypes.LOGOUT;
}
interface RefreshAction {
	type: AccountActionTypes.REFRESH;
}
interface LoadingAction {
	type: AccountActionTypes.LOADING;
	payload: boolean;
}
export type AccountAction =
	| RegistrationAction
	| LoginAction
	| LogoutAction
	| RefreshAction
	| LoadingAction;
