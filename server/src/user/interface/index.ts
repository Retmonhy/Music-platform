import { Types, Document } from 'mongoose';
import { User } from '../schemas';

export type UserModelType =
  | User &
      Document<any, any, any> & {
        _id: Types.ObjectId;
      };
