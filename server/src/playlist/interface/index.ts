import { Types, Document } from 'mongoose';
import { Playlist } from '../schemas/playlist.schema';

export interface IPlaylist {
  cover: string;
  name: string;
  description: string;
  owner_id: string;
  tracks: string[];
}

export type PlaylistModelType =
  | Playlist &
      Document<any, any, any> & {
        _id: Types.ObjectId;
      };
