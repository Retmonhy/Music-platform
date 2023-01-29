import { IUpdateData } from './../types/auth';
import { IComment, ITrack, IUser } from '../../types';
export interface IDefaultParams {
	accessToken: string;
}
export interface ICommentResponse {
	isSuccess: boolean;
	comment: IComment;
}
export interface ICreateTrackResponse {
	isSuccess: boolean;
	track: ITrack;
}
export interface IDeleteTrackResponse {
	isSuccess: boolean;
	trackId: string;
}
export interface ILoginUserResponse {
	accessToken: string;
	refreshToken: string;
	user: IUser;
}
export interface IUpdateProfileRequest {
	payload: IUpdateData;
	params: IDefaultParams;
}
export interface IUpdateProfileResponse {
	isSuccess: boolean;
	user: IUser;
}
