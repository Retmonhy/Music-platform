import { fetchUserMusic } from './../ActionCreators/account';
import {
	IAuthorizationAction,
	IUpdateAction,
	IAddTrackAction,
} from './../../types/account';
import { AccountActionTypes, AccountState, IMenuItem } from '../../types';
import { AccountRoutes } from '../../shared';
import { AnyAction, AsyncThunk, createReducer } from '@reduxjs/toolkit';
import {
	addTrackIntoMyMusic,
	changeRouteTo,
	checkAuth,
	logout,
	update,
} from '../ActionCreators/account';
import { FulfilledAction, PendingAction, RejectedAction } from '.';

const menuList: IMenuItem[] = [
	{
		name: 'Личные данные',
		isSelected: false,
		href: AccountRoutes.Profile,
	},
	{
		name: 'Моя музыка',
		isSelected: false,
		href: AccountRoutes.Tracks,
	},
	{
		name: 'Мои плейлисты',
		isSelected: false,
		href: AccountRoutes.Playlists,
	},
	{
		name: 'Музыкантам',
		isSelected: false,
		href: AccountRoutes.Musition,
	},
];

function isPendingAction(action: AnyAction): action is PendingAction {
	return action.type.endsWith('/pending');
}
function isRejectedAction(action: AnyAction): action is RejectedAction {
	return action.type.endsWith('/rejected');
}
function isFulfilledAction(action: AnyAction): action is FulfilledAction {
	return action.type.endsWith('/fulfilled');
}
function isAuthorizationAction(action: IAuthorizationAction) {
	return action.type === `${AccountActionTypes.AUTHORIZATION}/fulfilled`;
}

const initialState: AccountState = {
	accessToken: null,
	refreshToken: null,
	user: null,
	isLoading: false,
	isAuth: false,
	routes: menuList,
	userTracks: [],
};
export const accountReducer = createReducer(
	initialState as AccountState,
	builder => {
		builder
			.addCase(changeRouteTo, (state, action) => ({
				...state,
				routes: menuList.map(i =>
					i.href === action.payload ? { ...i, isSelected: true } : i,
				),
			}))

			.addCase(logout.fulfilled, () => initialState)
			.addCase(update.fulfilled, (state, action) => ({
				...state,
				user: action.payload,
			}))
			.addCase(addTrackIntoMyMusic.fulfilled, (state, action) => {
				console.log('action = ', action);
				if (state.isAuth && action.payload) {
					state.userTracks = [action.payload, ...state.userTracks];
				}
				return state;
			})
			.addMatcher(isAuthorizationAction, (state, action) => ({
				...state,
				isAuth: true,
				...action.payload,
			}))
			//для всех промисов, которые в ожидании
			.addMatcher(isPendingAction, state => {
				state.isLoading = true;
			})
			//для всех промисов, которые разрешились успехом
			.addMatcher(isFulfilledAction, state => {
				state.isLoading = false;
			})
			//для всех промисов, которые выдают ошибку
			.addMatcher(isRejectedAction, state => {
				state.isLoading = false;
			});
	},
);
// export const accountReducer = createReducer(initialState as AccountState, {
// 	[AccountActionTypes.LOADING]: (state, action: ILoadingAction) => {
// 		state.isLoading = action.payload;
// 	},
// 	[login.fulfilled]: (
// 		state,
// 		action: IAuthorizationAction,
// 	) => ({
// 		...state,
// 		isAuth: true,
// 		...action.payload,
// 	}),
// 	[AccountActionTypes.LOGOUT]: () => initialState,
// 	[AccountActionTypes.UPDATE]: (state, action: IUpdateAction) => ({
// 		...state,
// 		user: action.payload,
// 	}),
// 	[AccountActionTypes.CHANGE_ROUTE]: (state, action: IChangeRouteAction) => ({
// 		...state,
// 		routes: menuList.map(i =>
// 			i.href === action.payload ? { ...i, isSelected: true } : i,
// 		),
// 	}),
// 	[AccountActionTypes.ADD_TRACK]: (state, action: IAddTrackAction) => {
// 		if (state.user) {
// 			return {
// 				...state,
// 				user: { ...state.user, tracks: [action.payload, ...state.user.tracks] },
// 			};
// 		}
// 		return state;
// 	},
// });
