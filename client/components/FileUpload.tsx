import { useRef } from 'react';

interface IFileUploadProps {
	setFile: Function;
	accept: string;
	children: React.ReactNode;
}
export const FileUpload: React.FC<IFileUploadProps> = ({
	setFile,
	accept,
	children,
}) => {
	const inputRef = useRef<HTMLInputElement>();
	const onClick = () => inputRef.current.click();
	const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		// console.log(evt.target.files);
		setFile(evt.target.files);
	};
	return (
		<div onClick={onClick}>
			<input
				type='file'
				accept={accept}
				style={{ display: 'none' }}
				ref={inputRef}
				onChange={onChange}
			/>
			{children}
		</div>
	);
};

//  FileUpload;
