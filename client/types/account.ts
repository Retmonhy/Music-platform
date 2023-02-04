import { AddTrack } from './../pages/tracks/components/AddTrack';
import { AddRounded } from '@material-ui/icons';
import { ILoginUserResponse } from './../shared/api/interface';
export enum AccountActionTypes {
	AUTHORIZATION = 'AUTHORIZATION',
	LOGOUT = 'LOGOUT',
	REFRESH = 'REFRESH',
	LOADING = 'LOADING',
	UPDATE = 'UPDATE',
	CHANGE_ROUTE = 'CHANGE_ROUTE',
	ADD_TRACK = 'ADD_TRACK',
}
export type AccountState = {
	refreshToken: string;
	accessToken: string;
	user: IUser;
	isLoading: boolean;
	isAuth: boolean;
	routes: IMenuItem[];
};
export interface IMenuItem {
	name: string;
	isSelected: boolean;
	href: string;
}
export interface IUser {
	id: string;
	email: string;
	firstname: string;
	surname: string;
	isActivated: boolean;
	tracks: string[];
}

export interface IAuthorizationAction {
	type: AccountActionTypes.AUTHORIZATION;
	payload: ILoginUserResponse;
}
export interface ILogoutAction {
	type: AccountActionTypes.LOGOUT;
}
export interface IRefreshAction {
	type: AccountActionTypes.REFRESH;
	payload: IUser;
}
export interface ILoadingAction {
	type: AccountActionTypes.LOADING;
	payload: boolean;
}
export interface IUpdateAction {
	type: AccountActionTypes.UPDATE;
	payload: IUser;
}
export interface IAddTrackAction {
	type: AccountActionTypes.ADD_TRACK;
	payload: string;
}
export interface IChangeRouteAction {
	type: AccountActionTypes.CHANGE_ROUTE;
	payload: string;
}
export type AccountAction =
	| IAuthorizationAction
	| ILogoutAction
	| IRefreshAction
	| ILoadingAction
	| IUpdateAction
	| IChangeRouteAction
	| IAddTrackAction;
