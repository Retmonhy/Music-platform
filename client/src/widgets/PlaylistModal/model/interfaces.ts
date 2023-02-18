import { IFile } from '../../../shared';
import { ITrack } from '../../../types';

export interface IPlaylistPayload {
	file: IFile;
	name: string;
	description: string;
	tracks: ITrack[];
}
