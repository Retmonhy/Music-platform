import { ObjectId } from 'mongoose';

export class CommentDto {
  readonly userName: string;
  readonly text: string;
  readonly trackId: ObjectId;
}
