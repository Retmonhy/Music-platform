export enum TrackEndpoints {
	TRACKS = '/tracks',
	SEARCH = '/tracks/search',
	POST_COMMENT = '/tracks/comment',
}
export enum AccountEndpoints {
	LOGIN = '/account/login',
	LOGOUT = '/account/logout',
	REFRESH = '/account/refresh',
	REGISTRATION = '/account/registration',
	UPDATE = '/account/update',
	FETCH_USER_MUSIC = '/account/music',
	ADD_TRACK = '/account/music/add',
	REMOVE_TRACK = '/account/music/remove',
	FETCH_USER_PLAYLISTS = '/account/playlists',
}
export enum FileEndpoints {
	UPLOAD = '/file/upload',
}
export enum PlaylistEndpoints {
	CREATE = '/playlist/create',
	ADD = '/playlist/add',
	REMOVE = '/playlist/remove',
}
