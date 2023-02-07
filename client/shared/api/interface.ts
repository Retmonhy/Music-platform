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
export type IUpdateProfileRequest = {
	payload: IUpdateData;
} & IDefaultParams;
export interface IUpdateProfileResponse {
	isSuccess: boolean;
	user: IUser;
}
export interface IAddTrackRequest {
	id: string; //id добавляемого трека
}
export interface IAddTrackResponce {
	isSuccess: boolean;
	track: ITrack;
}
