import { PlaylistEndpoints } from './../endpoint';
import { IPlaylistPayload } from './../../../widgets/PlaylistModal/model/interfaces';
import { api } from '..';

export interface ICreatePlaylistResponse {}
export const createPlaylistReq = (payload: FormData) => {
	return api.post<ICreatePlaylistResponse>(PlaylistEndpoints.CREATE, payload);
};
