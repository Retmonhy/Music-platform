export enum TrackEndpoints {
	TRACKS = '/tracks',
	CREATE_TRACK = '/tracks/create',
	SEARCH = '/tracks/search',
	POST_COMMENT = '/tracks/comment',
}
export enum AccountEndpoints {
	// /account
	LOGIN = '/account/login',
	LOGOUT = '/account/logout',
	REFRESH = '/account/refresh',
	REGISTRATION = '/account/registration',
	UPDATE = '/account/update',
	//tracks
	FETCH_USER_MUSIC = '/account/music',
	ADD_TRACK = '/account/music/add',
	REMOVE_TRACK = '/account/music/remove',
	//playlists
	ADD_PLAYLIST_TO_USER = '/account/playlists/add',
	REMOVE_PLAYLIST_FROM_USER = '/account/playlists/remove',
}
export enum FileEndpoints {
	UPLOAD = '/file/upload',
}
export enum PlaylistEndpoints {
	CREATE = '/playlist/create',
	DELETE = '/playlist/delete',
	UPDATE = '/playlist/update',
	ADD = '/playlist/add',
	REMOVE = '/playlist/remove',
	FETCH_USER_PLAYLISTS = '/playlist',
	FETCH_ALL_PLAYLISTS = '/playlist/all',
	FETCH_TRACKS = '/playlist/tracks',
	MANAGE_PLAYLIST_TRACKS = '/playlist/tracks/manage',
}
