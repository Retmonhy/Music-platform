import { AccountAction, AccountActionTypes } from './../../types/account';
import { Dispatch } from 'react';
import {
	apiInstance,
	AccountEndpoints,
	ILoginUserResponse,
} from '../../shared/api';
import { IRegistrationData } from '../../shared';

export const setIsLoading = (value: boolean) => {
	console.log('value = ', value);
	return async (dispatch: Dispatch<AccountAction>) => {
		dispatch({
			type: AccountActionTypes.LOADING,
			payload: value,
		});
	};
};
export const registration = async (payload: IRegistrationData) => {
	return async (dispatch: Dispatch<AccountAction>) => {
		try {
			setIsLoading(true);
			const { data } = await apiInstance.post<ILoginUserResponse>(
				AccountEndpoints.REGISTRATION,
				payload,
			);
			localStorage.setItem('refreshToken', data.refreshToken);
			dispatch({
				type: AccountActionTypes.REGISTRATION,
				payload: data,
			});
			setIsLoading(false);
		} catch (error) {
			console.error('loginError: ', error);
			setIsLoading(false);
		}
	};
};
export const login = async (email: string, password: string) => {
	return async (dispatch: Dispatch<AccountAction>) => {
		try {
			setIsLoading(true);
			const { data } = await apiInstance.post<ILoginUserResponse>(
				AccountEndpoints.LOGIN,
				{ email, password },
				{},
			);
			localStorage.setItem('refreshToken', data.refreshToken);
			setIsLoading(false);
			return dispatch({
				type: AccountActionTypes.LOGIN,
				payload: data,
			});
		} catch (error) {
			setIsLoading(false);
			console.error('loginError: ', error);
		}
	};
};
export const logout = async () => {
	return async (dispatch: Dispatch<AccountAction>) => {
		try {
			setIsLoading(true);
			const { data } = await apiInstance.post(AccountEndpoints.LOGOUT);
			localStorage.removeItem('refreshToken');
			setIsLoading(false);
			return dispatch({
				type: AccountActionTypes.LOGOUT,
			});
		} catch (error) {
			console.error('logoutError: ', error);
			setIsLoading(false);
		}
	};
};
