export interface IComment {
	_id: string;
	username: string;
	text: string;
}
export interface ITrack {
	_id: string;
	artist: string;
	name: string;
	text: string;
	listens: number;
	picture: string;
	audio: string;
	comments: IComment[];
}
