import { UploadActionType } from '../../types/file';
import { FileEndpoints } from '../endpoint';
import { IUploadResponse, api } from '..';

export class FileService {
	static upload(act: UploadActionType, file: File) {
		const form = new FormData();
		form.append('file', file);
		return api.post<IUploadResponse>(FileEndpoints.UPLOAD, form, {
			params: { act },
		});
	}
}
