import { IComment, ITrack, IUser } from '../../types';

export interface ICommentResponse {
	isSuccess: boolean;
	comment: IComment;
}
export interface ICreateTrackResponse {
	isSuccess: boolean;
	track: ITrack;
}
export interface ILoginUserResponse {
	accessToken: string;
	refreshToken: string;
	user: IUser;
}
