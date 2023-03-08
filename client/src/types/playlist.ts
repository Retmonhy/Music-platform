import { ITrack } from './track';

export interface IPlaylist {
	id: string;
	name: string;
	owner_id: string;
	description: string;
	numberOfTracks: number;
	lastUpdate: number;
	cover: string;
}
export interface IPlaylistPayload {
	name: string;
	description: string;
	cover: string;
	tracks: ITrack[];
}
