import { ILoginUserResponse } from './../shared/api/interface';
export enum AccountActionTypes {
	AUTHORIZATION = 'AUTHORIZATION',
	LOGOUT = 'LOGOUT',
	REFRESH = 'REFRESH',
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
	firstname: string;
	surname: string;
	isActivated: boolean;
}

interface AuthorizationAction {
	type: AccountActionTypes.AUTHORIZATION;
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
	| AuthorizationAction
	| LogoutAction
	| RefreshAction
	| LoadingAction;
