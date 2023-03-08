import { UploadActionType } from '../../types/file';
import { FileEndpoints } from '../endpoint';
import { IUploadResponse, api } from '..';

export class FileService {
	static upload(act: UploadActionType, payload: FormData) {
		return api.post<IUploadResponse>(FileEndpoints.UPLOAD, payload, {
			params: { act },
		});
	}
}
