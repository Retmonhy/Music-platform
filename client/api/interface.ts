import { IComment, ITrack } from '../types';

export interface ICommentResponse {
	isSuccess: boolean;
	comment: IComment;
}
export interface ICreateTrackResponse {
	isSuccess: boolean;
	track: ITrack;
}
