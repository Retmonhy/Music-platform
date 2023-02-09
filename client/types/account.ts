import { ITrack } from './track';
import { ILoginUserResponse } from './../shared/api/interface';
export enum AccountActionTypes {
	AUTHORIZATION = 'AUTHORIZATION',
	LOGOUT = 'LOGOUT',
	REFRESH = 'REFRESH',
	LOADING = 'LOADING',
	UPDATE = 'UPDATE',
	CHANGE_ROUTE = 'CHANGE_ROUTE',
	ADD_TRACK = 'ADD_TRACK',
	FETCH_USER_MUSIC = 'FETCH_USER_MUSIC',
}
export type AccountState = {
	refreshToken: string;
	accessToken: string;
	user: IUser;
	isLoading: boolean;
	isAuth: boolean;
	routes: IMenuItem[];
	userTracks: ITrack[];
	isHidrated: boolean;
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
	payload: {
		refreshToken: string;
		accessToken: string;
		user: IUser;
	};
}
export interface ILoadingAction {
	type: AccountActionTypes.LOADING;
	payload: boolean;
}
export interface IUpdateAction {
	type: AccountActionTypes.UPDATE;
	payload: IUser;
}
export interface IFetchUserMusic {
	type: AccountActionTypes.FETCH_USER_MUSIC;
	payload: ITrack[];
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
	| IAddTrackAction
	| IFetchUserMusic;
