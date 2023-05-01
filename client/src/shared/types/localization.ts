import { registration } from './../store/ActionCreators/account';
export interface ILocalization {
	// страница треков
	readonly Tracks: {
		readonly PageTitle: string;

		readonly DeleteFromCurrentPlaylist: string;

		readonly AddToMyMusic: string;

		readonly PlayNext: string;

		readonly NewPlaylist: string;

		readonly AddToPlaylist: string;

		readonly ShowAll: string;

		readonly SearchMusic: string;
	};
	// страница создание треков
	readonly CreateTrack: {
		readonly PageTitle: string;

		readonly TrackTitle: string;

		readonly TrackAuthor: string;

		readonly TrackText: string;

		readonly UploadCover: string;

		readonly CoverIsUploaded: string;

		readonly UploadAudio: string;

		readonly AudioIsUploaded: string;

		readonly Prev: string;

		readonly Next: string;

		readonly UploadTrack: string;
	};
	// страница плейлистов
	readonly Playlists: {
		readonly PageTitle: string;

		readonly Modal: {
			readonly CreationTitle: string;

			readonly Cover: string;

			readonly PlaylistName: string;

			readonly PlaylistDescription: string;

			readonly Delete: string;
		};
	};
	// страница профиля
	readonly Account: {
		readonly PersonalData: string;

		readonly SignOut: string;

		readonly MyMusic: string;

		readonly MyPlaylists: string;

		readonly Musition: string;

		readonly LoginPageTitle: string;

		readonly Registration: string;

		readonly Login: string;

		readonly RegistrationButton: string;

		readonly LoginButton: string;
	};
	//общие
	readonly General: {
		readonly Name: string;

		readonly Surname: string;

		readonly Email: string;

		readonly Save: string;

		readonly Password: string;
	};
	//наивгационное меню
	readonly NavMenu: {
		readonly Main: string;

		readonly TrackList: string;

		readonly PlaylistList: string;

		readonly Authentification: string;

		readonly Profile: string;
	};
}
