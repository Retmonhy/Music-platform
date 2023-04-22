import { HTMLAttributes, useRef } from 'react';

interface IFileUploadProps extends HTMLAttributes<HTMLDivElement> {
	setFile: Function;
	accept: string;
	children: React.ReactNode;
}
export const FileUpload: React.FC<IFileUploadProps> = ({
	setFile,
	accept,
	children,
	...props
}) => {
	const inputRef = useRef<HTMLInputElement>();
	const onClick = () => inputRef.current.click();
	const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setFile(evt.target.files);
	};
	return (
		<div {...props} onClick={onClick}>
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
