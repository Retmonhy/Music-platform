import { BasePlaylistDto } from './base-playlist.dto';

export type UpdatePlaylistDto = Omit<BasePlaylistDto, 'owner'>;
