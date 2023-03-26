import { IPlaylist, ITrack } from '../../types';
import { PlaylistEndpoints } from '../endpoint';
import { ICreatePlaylistResponse, api } from '..';
import { IPlaylistPayload } from '../../types';

export class PlaylistService {
	static createPlaylist(payload: IPlaylistPayload) {
		return api.post<ICreatePlaylistResponse>(PlaylistEndpoints.CREATE, payload);
	}
	static fetchPlaylistTracks(playlistId: string) {
		return api.get<ITrack[]>(PlaylistEndpoints.FETCH_TRACKS, {
			params: { id: playlistId },
		});
	}
	static updatePlaylist(id: string, payload: IPlaylistPayload) {
		return api.post<ICreatePlaylistResponse>(
			PlaylistEndpoints.UPDATE,
			payload,
			{ params: { id } },
		);
	}
	static managePlaylistTracks = (playlistId: string, trackId: string) => {
		return api.post<IPlaylist>(
			PlaylistEndpoints.MANAGE_PLAYLIST_TRACKS,
			{},
			{ params: { playlistId, trackId } },
		);
	};
}