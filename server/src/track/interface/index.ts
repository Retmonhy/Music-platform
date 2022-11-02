import { Track, Comment } from '../schemas';

export interface ICreateTrackResponse {
  isSuccess: boolean;
  track: Track;
}
export interface ICommentResponse {
  isSuccess: boolean;
  comment: Comment;
}
