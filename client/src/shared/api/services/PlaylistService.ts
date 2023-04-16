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
	//добавть чужой плейлист пользователю
	static addPlaylistToUser(id: string) {
		return api.post<IDefaultResponse>(
			PlaylistEndpoints.ADD,
			{},
			{
				params: { id },
			},
		);
	}
	//убрать чужые плейлисты от пользователя
	static removePlaylistsFromUser(ids: string[]) {
		return api.post<IDefaultResponse>(PlaylistEndpoints.REMOVE, { ids });
	}
	//тут надо переписать функцию, чтобы она работала для двух случаев: запрашивала плелисты юзеров или все плейлисты
	static fetchUserPlaylists = async () => {
		return api.get<IPlaylist[]>(PlaylistEndpoints.FETCH_USER_PLAYLISTS);
	};
	static fetchPlaylists = async () => {
		return api.get<IPlaylist[]>(PlaylistEndpoints.FETCH_ALL_PLAYLISTS);
	};

	static fetchPlaylistTracks(id: string) {
		return api.get<ITrack[]>(PlaylistEndpoints.FETCH_TRACKS, {
			params: { id },
		});
	}
	//удаяет или добавлеяет трек в плейлист
	static managePlaylistTracks = (params: IManagePlaylistTracksPayload) => {
		return api.post<IPlaylist>(
			PlaylistEndpoints.MANAGE_PLAYLIST_TRACKS,
			{},
			{ params },
		);
	};
}
