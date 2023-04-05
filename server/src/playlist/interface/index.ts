import { Types, Document } from 'mongoose';
import { Playlist } from '../schemas/playlist.schema';

export interface IPlaylist {
  cover: string;
  name: string;
  description: string;
  ownerId: string;
  tracks: string[];
}

export type PlaylistModelType =
  | Playlist &
      Document<any, any, any> & {
        _id: Types.ObjectId;
      };

export enum ManageTracksAction {
  Remove = 0,
  Add = 1,
}
export interface IManagePlaylistTracksQuery {
  playlistId: string;
  trackId: string;
  action: ManageTracksAction;
}
