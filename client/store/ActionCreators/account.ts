import { ILoginData, IUpdateData } from '../../shared/types/auth';
import { AccountAction, AccountActionTypes } from '../../types/account';
import { AccountService, IRegistrationData, StorageKeys } from '../../shared';
import { Dispatch } from '@reduxjs/toolkit';

export const setIsLoading = (
	dispatch: Dispatch<AccountAction>,
	value: boolean,
) => {
	console.log('setIsLoading = ', value);
	dispatch({
		type: AccountActionTypes.LOADING,
		payload: value,
	});
};

export const registration = (payload: IRegistrationData) => {
	return async (dispatch: Dispatch<AccountAction>) => {
		try {
			setIsLoading(dispatch, true);
			const { data } = await AccountService.registration(payload);
			localStorage.setItem(StorageKeys.accessToken, data.accessToken);
			setIsLoading(dispatch, false);
			return dispatch({
				type: AccountActionTypes.AUTHORIZATION,
				payload: data,
			});
		} catch (error) {
			console.error('loginError: ', error);
			setIsLoading(dispatch, false);
		}
	};
};
export const login = (payload: ILoginData) => {
	return async (dispatch: Dispatch<AccountAction>) => {
		try {
			setIsLoading(dispatch, true);
			const { data } = await AccountService.login(payload);
			localStorage.setItem(StorageKeys.accessToken, data.accessToken);
			setIsLoading(dispatch, false);
			return dispatch({
				type: AccountActionTypes.AUTHORIZATION,
				payload: data,
			});
		} catch (error) {
			setIsLoading(dispatch, false);
			console.error('loginError: ', error);
		}
	};
};
export const logout = () => {
	return async (dispatch: Dispatch<AccountAction>) => {
		try {
			setIsLoading(dispatch, true);
			const { data } = await AccountService.logout();
			localStorage.removeItem(StorageKeys.accessToken);
			setIsLoading(dispatch, false);
			return dispatch({
				type: AccountActionTypes.LOGOUT,
			});
		} catch (error) {
			console.error('logoutError: ', error);
			setIsLoading(dispatch, false);
		}
	};
};
export const update = (accessToken: string, payload: IUpdateData) => {
	return async (dispatch: Dispatch<AccountAction>) => {
		try {
			console.log(' update= ');
			setIsLoading(dispatch, true);
			const params = { accessToken };
			const { data } = await AccountService.updateProfile({ payload, params });

			if (!data.isSuccess) return;
			dispatch({
				type: AccountActionTypes.UPDATE,
				payload: data.user,
			});
			setIsLoading(dispatch, false);
		} catch (error) {
			console.error('update Error: ', error);

			setIsLoading(dispatch, false);
		}
	};
};
export const checkAuth = () => {
	return async (dispatch: Dispatch<AccountAction>) => {
		try {
			setIsLoading(dispatch, true);
			const { data } = await AccountService.checkAuth();
			if (data.accessToken) {
				localStorage.setItem(StorageKeys.accessToken, data.accessToken);
				dispatch({
					type: AccountActionTypes.AUTHORIZATION,
					payload: data,
				});
			}
			setIsLoading(dispatch, false);
		} catch (error) {
			setIsLoading(dispatch, false);
			throw error;
		}
	};
};
