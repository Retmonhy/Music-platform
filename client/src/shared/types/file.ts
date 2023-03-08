export interface IFile {
	lastModified: number;
	lastModifiedDate: Date;
	name: string;
	size: number;
	type: string;
	webkitRelativePath: string;
}

export enum UploadActionType {
	PlaylistCover = 'playlist_cover',
	TrackCover = 'track_cover',
	TrackAudio = 'track_audio',
}
