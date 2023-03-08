import { PlaylistEndpoints } from '../endpoint';
import { ICreatePlaylistResponse, api } from '..';
import { IPlaylistPayload } from '../../../types/playlist';

export class PlaylistService {
	static createPlaylist(payload: IPlaylistPayload) {
		return api.post<ICreatePlaylistResponse>(PlaylistEndpoints.CREATE, payload);
	}
}
