import { ILoginData, IUpdateData } from '../../shared/types/auth';
import { AccountActionTypes } from '../../types/account';
import { AccountService, IRegistrationData, StorageKeys } from '../../shared';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

interface IArgUpdate {
	payload: IUpdateData;
	accessToken: string;
}
interface IAddTrack {
	id: string;
	accessToken: string;
}
export const loading = createAction<boolean>(AccountActionTypes.LOADING);
export const changeRouteTo = createAction<string>(
	AccountActionTypes.CHANGE_ROUTE,
);
export const login = createAsyncThunk(
	AccountActionTypes.AUTHORIZATION,
	async (payload: ILoginData, ta) => {
		try {
			const { data } = await AccountService.login(payload);
			if (data) {
				localStorage.setItem(StorageKeys.accessToken, data.accessToken);
			}
			return data;
		} catch (error) {
			console.error('login ERROR: ', error);
			return ta.rejectWithValue(error.response.data);
		}
	},
);
export const registration = createAsyncThunk(
	AccountActionTypes.AUTHORIZATION,
	async (payload: IRegistrationData, ta) => {
		try {
			const { data } = await AccountService.registration(payload);
			if (data) {
				localStorage.setItem(StorageKeys.accessToken, data.accessToken);
			}
			return data;
		} catch (error) {
			console.error('registration ERROR: ', error);
			return ta.rejectWithValue(error.response.data);
		}
	},
);
export const logout = createAsyncThunk(
	AccountActionTypes.LOGOUT,
	async (_, ta) => {
		try {
			return await AccountService.logout();
		} catch (error) {
			console.error('logout ERROR: ', error);
			return ta.rejectWithValue(error.response.data);
		}
	},
);
export const update = createAsyncThunk(
	AccountActionTypes.UPDATE,
	async ({ accessToken, payload }: IArgUpdate, ta) => {
		try {
			const { data } = await AccountService.updateProfile({
				payload,
				accessToken,
			});
			if (data.user) {
				return data.user;
			}
		} catch (error) {
			console.error('update ERROR: ', error);
			return ta.rejectWithValue(error.response.data);
		}
	},
);
export const checkAuth = createAsyncThunk(
	AccountActionTypes.AUTHORIZATION,
	async (_, ta) => {
		try {
			const { data } = await AccountService.checkAuth();
			if (data.accessToken) {
				localStorage.setItem(StorageKeys.accessToken, data.accessToken);
			}
			return data;
		} catch (error) {
			console.error('update ERROR: ', error);
			return ta.rejectWithValue(error.response.data);
		}
	},
);
export const addTrackIntoMyMusic = createAsyncThunk(
	AccountActionTypes.ADD_TRACK,
	async (trackId: string, ta) => {
		try {
			const { data } = await AccountService.addTrack({ id: trackId });
			return data.trackId;
		} catch (error) {
			console.error('update ERROR: ', error);
			return ta.rejectWithValue(error.response.data);
		}
	},
);

// export const addTrackIntoMyMusic = (trackId: string) => {
// 	return async (dispatch: Dispatch<IAddTrackAction>) => {
// 		try {
// 			const { data } = await AccountService.addTrack(trackId);
// 			console.log('addTrackIntoMyMusic  data = ', data);
// 			if (data) {
// 				dispatch({ type: AccountActionTypes.ADD_TRACK, payload: trackId });
// 			}
// 		} catch (error) {
// 			console.error('addTrackIntoMyMusic ERROR = ', error);
// 		}
// 	};
// };
// export const checkAuth = () => {
// 	return async (dispatch: Dispatch<AccountAction>) => {
// 		try {
// 			// setIsLoading(dispatch, true);
// 			const { data } = await AccountService.checkAuth();
// 			if (data.accessToken) {
// 				localStorage.setItem(StorageKeys.accessToken, data.accessToken);
// 				dispatch({
// 					type: AccountActionTypes.AUTHORIZATION,
// 					payload: data,
// 				});
// 			}
// 			// setIsLoading(dispatch, false);
// 		} catch (error) {
// 			// setIsLoading(dispatch, false);
// 			throw error;
// 		}
// 	};
// };

// export const update = (accessToken: string, payload: IUpdateData) => {
// 	return async (dispatch: Dispatch<AccountAction>) => {
// 		try {
// 			console.log(' update= ');
// 			setIsLoading(dispatch, true);
// 			const params = { accessToken };
// 			const { data } = await AccountService.updateProfile({ payload, params });

// 			if (!data.isSuccess) return;
// 			dispatch({
// 				type: AccountActionTypes.UPDATE,
// 				payload: data.user,
// 			});
// 			setIsLoading(dispatch, false);
// 		} catch (error) {
// 			console.error('update Error: ', error);

// 			setIsLoading(dispatch, false);
// 		}
// 	};
// };
// export const registration = (payload: IRegistrationData) => {
// 	return async (dispatch: Dispatch<AccountAction>) => {
// 		try {
// 			setIsLoading(dispatch, true);
// 			const { data } = await AccountService.registration(payload);
// 			localStorage.setItem(StorageKeys.accessToken, data.accessToken);
// 			setIsLoading(dispatch, false);
// 			return dispatch({
// 				type: AccountActionTypes.AUTHORIZATION,
// 				payload: data,
// 			});
// 		} catch (error) {
// 			console.error('loginError: ', error);
// 			setIsLoading(dispatch, false);
// 		}
// 	};
// };
// export const login1 = (payload: ILoginData) => {
// 	return async (dispatch: Dispatch<AccountAction>) => {
// 		try {
// 			dispatch(setIsLoading(true));
// 			const { data } = await AccountService.login(payload);
// 			localStorage.setItem(StorageKeys.accessToken, data.accessToken);
// 			dispatch(setIsLoading(false));
// 			return dispatch({
// 				type: AccountActionTypes.AUTHORIZATION,
// 				payload: data,
// 			});
// 		} catch (error) {
// 			dispatch(setIsLoading(false));
// 			console.error('loginError: ', error);
// 		}
// 	};
// };
// export const logout = () => {
// 	return async (dispatch: Dispatch<AccountAction>) => {
// 		try {
// 			setIsLoading(dispatch, true);
// 			const { data } = await AccountService.logout();
// 			localStorage.removeItem(StorageKeys.accessToken);
// 			setIsLoading(dispatch, false);
// 			return dispatch({
// 				type: AccountActionTypes.LOGOUT,
// 			});
// 		} catch (error) {
// 			console.error('logoutError: ', error);
// 			setIsLoading(dispatch, false);
// 		}
// 	};
// };
// export const update = (accessToken: string, payload: IUpdateData) => {
// 	return async (dispatch: Dispatch<AccountAction>) => {
// 		try {
// 			console.log(' update= ');
// 			setIsLoading(dispatch, true);
// 			const params = { accessToken };
// 			const { data } = await AccountService.updateProfile({ payload, params });

// 			if (!data.isSuccess) return;
// 			dispatch({
// 				type: AccountActionTypes.UPDATE,
// 				payload: data.user,
// 			});
// 			setIsLoading(dispatch, false);
// 		} catch (error) {
// 			console.error('update Error: ', error);

// 			setIsLoading(dispatch, false);
// 		}
// 	};
// };
// export const checkAuth = () => {
// 	return async (dispatch: Dispatch<AccountAction>) => {
// 		try {
// 			// setIsLoading(dispatch, true);
// 			const { data } = await AccountService.checkAuth();
// 			if (data.accessToken) {
// 				localStorage.setItem(StorageKeys.accessToken, data.accessToken);
// 				dispatch({
// 					type: AccountActionTypes.AUTHORIZATION,
// 					payload: data,
// 				});
// 			}
// 			// setIsLoading(dispatch, false);
// 		} catch (error) {
// 			// setIsLoading(dispatch, false);
// 			throw error;
// 		}
// 	};
// };
// export const changeRouteTo = createAction<string>(
// 	AccountActionTypes.CHANGE_ROUTE,
// );
// export const addTrackIntoMyMusic = (trackId: string) => {
// 	return async (dispatch: Dispatch<IAddTrackAction>) => {
// 		try {
// 			const { data } = await AccountService.addTrack(trackId);
// 			console.log('addTrackIntoMyMusic  data = ', data);
// 			if (data) {
// 				dispatch({ type: AccountActionTypes.ADD_TRACK, payload: trackId });
// 			}
// 		} catch (error) {
// 			console.error('addTrackIntoMyMusic ERROR = ', error);
// 		}
// 	};
// };
