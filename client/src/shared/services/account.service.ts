import { generateUrl } from './../api/index';
import { ITrack } from './../../types/track';
import { ILoginData, IRegistrationData } from './../types/auth';
import {
	api,
	baseUrl,
	IUpdateProfileRequest,
	IAddTrackResponce,
	ITrackRequest,
	IRemoveTrackResponse,
	ILoginUserResponse,
	AccountEndpoints,
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
	static updateProfile = async ({
		payload,
		...params
	}: IUpdateProfileRequest) => {
		return api.post<IUpdateProfileResponse>(AccountEndpoints.UPDATE, payload, {
			params,
		});
	};
	static checkAuth = async () => {
		return axios.get<ILoginUserResponse>(generateUrl('/account/refresh'), {
			withCredentials: true,
		});
	};
	static addTrack = async (params: ITrackRequest) => {
		return api.get<IAddTrackResponce>(AccountEndpoints.ADD_TRACK, {
			params,
		});
	};
	static removeTrack = async (params: ITrackRequest) => {
		return api.delete<IRemoveTrackResponse>(AccountEndpoints.REMOVE_TRACK, {
			params,
		});
	};
	static fetchUserMusic = async () => {
		return api.get<ITrack[]>(AccountEndpoints.FETCH_USER_MUSIC);
	};
}
