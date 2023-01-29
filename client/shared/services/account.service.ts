import { checkAuth } from './../../store/ActionCreators/account';
import { IUpdateProfileRequest } from './../api/interface';
import { ILoginData, IRegistrationData } from './../types/auth';
import {
	AccountEndpoints,
	api,
	baseUrl,
	ILoginUserResponse,
	IUpdateProfileResponse,
} from '../api';
import axios from 'axios';

export class AccountService {
	static login = async (payload: ILoginData) => {
		return api.post<ILoginUserResponse>(AccountEndpoints.LOGIN, payload, {});
	};
	static registration = async (payload: IRegistrationData) => {
		return api.post<ILoginUserResponse>(AccountEndpoints.REGISTRATION, payload);
	};
	static logout = async () => {
		return api.post(AccountEndpoints.LOGOUT);
	};
	static updateProfile = async ({ payload, params }: IUpdateProfileRequest) => {
		return api.post<IUpdateProfileResponse>(AccountEndpoints.UPDATE, payload, {
			params,
		});
	};
	static checkAuth = async () => {
		return axios.get<ILoginUserResponse>(`${baseUrl}account/refresh`, {
			withCredentials: true,
		});
	};
}
