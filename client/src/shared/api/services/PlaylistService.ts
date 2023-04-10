import { PlaylistEndpoints } from '../endpoint';
import { ICreatePlaylistResponse, IDefaultResponse, api } from '@shared/api';
import {
	IPlaylistPayload,
	IManagePlaylistTracksPayload,
	IPlaylist,
	ITrack,
} from '@shared/types';

export class PlaylistService {
	static createPlaylist(payload: IPlaylistPayload) {
		return api.post<ICreatePlaylistResponse>(PlaylistEndpoints.CREATE, payload);
	}
	static deletePlaylist(id: string) {
		return api.post<IDefaultResponse>(PlaylistEndpoints.DELETE, { id });
	}
	static updatePlaylist(id: string, payload: IPlaylistPayload) {
		return api.post<ICreatePlaylistResponse>(
			PlaylistEndpoints.UPDATE,
			payload,
			{ params: { id } },
		);
	}
	static addPlaylistToUser(id: string) {
		return api.post<IDefaultResponse>(
			PlaylistEndpoints.ADD,
			{},
			{
				params: { id },
			},
		);
	}
	static removePlaylistFromUser(id: string) {
		return api.post<IDefaultResponse>(
			PlaylistEndpoints.REMOVE,
			{},
			{
				params: { id },
			},
		);
	}
	//тут надо переписать функцию, чтобы она работала для двух случаев: запрашивала плелисты юзеров или все плейлисты
	static fetchPlaylists = async (id?: string) => {
		return api.get<IPlaylist[]>(PlaylistEndpoints.FETCH_PLAYLISTS, {});
	};
	static fetchPlaylistTracks(id: string) {
		return api.get<ITrack[]>(PlaylistEndpoints.FETCH_TRACKS, {
			params: { id },
		});
	}
	static managePlaylistTracks = (params: IManagePlaylistTracksPayload) => {
		return api.post<IPlaylist>(
			PlaylistEndpoints.MANAGE_PLAYLIST_TRACKS,
			{},
			{ params },
		);
	};
}
