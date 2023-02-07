import { Types, Document } from 'mongoose';
import { User } from '../schemas';

export type GetUserModel =
  | User &
      Document<any, any, any> & {
        _id: Types.ObjectId;
      };
