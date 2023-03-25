import { ITrack } from './track';

export interface IPlaylistData {
	name: string;
	description: string;
}
export interface IPlaylist extends IPlaylistData {
	id: string;
	owner_id: string;
	numberOfTracks: number;
	lastUpdate: number;
	cover: string;
	tracks: string;
}
export interface IPlaylistPayload extends IPlaylistData {
	cover: string;
	tracks: string[];
}
export class PlaylistTrack {
	track: ITrack;
	isChecked: boolean;
	constructor(track: ITrack, isChecked: boolean = true) {
		this.isChecked = isChecked;
		this.track = track;
	}
}
export enum PlaylistMode {
	Edit = 'EditPlaylist',
	Create = 'CreatePlaylist',
}
export interface IPlaylistState {
	mode: PlaylistMode;
	isVisible: boolean;
	info: IPlaylist | null;
	trackPool: PlaylistTrack[];
	selectedTracks: PlaylistTrack[];
}
export enum PlaylistActionTypes {
	SEARCH = 'PLAYLIST_SEARCH',
	ADD_TO_CURRENT_PLAYLIST = 'ADD_TO_CURRENT_PLAYLIST',
	ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST',
	CHECK_TRACK = 'PLAYLIST_CHECK_TRACK',
	RESET_MODAL_STATE = 'PLAYLIST_RESET_STATE',
	VISIBLE = 'PLAYLIST_VISIBLE',
	COVER = 'PLAYLIST_COVER',
	TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX',
	LOAD_PLAYLIST_STATE = 'LOAD_PLAYLIST_STATE',
	UPDATE_PLAYLIST = 'UPDATE_PLAYLIST',
	SET_MODE = 'SET_MODE',
}
