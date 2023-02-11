import { IUpdateData } from './../types/auth';
import { IComment, ITrack, IUser } from '../../types';
export interface IDefaultResponse {
	isSuccess: boolean;
}
export interface IDefaultParams {
	accessToken: string;
}
export interface ICommentResponse extends IDefaultResponse {
	comment: IComment;
}
export interface ICreateTrackResponse extends IDefaultResponse {
	track: ITrack;
}
export interface IDeleteTrackResponse extends IDefaultResponse {
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
export interface IUpdateProfileResponse extends IDefaultResponse {
	user: IUser;
}
export interface ITrackRequest {
	id: string; //id добавляемого трека
}
export interface IAddTrackResponce extends IDefaultResponse {
	track: ITrack;
}
export interface IRemoveTrackResponse extends IDefaultResponse {
	id: string;
}
