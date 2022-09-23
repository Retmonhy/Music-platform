import { ChangeEventHandler } from 'react';

interface ITrackProgressProps {
	left: string | number;
	right: string | number;
	onChange: ChangeEventHandler<HTMLInputElement>;
}

export const TrackProgress: React.FC<ITrackProgressProps> = ({
	left,
	right,
	onChange,
}) => {
	return (
		<div>
			<input
				type='range'
				min={0}
				max={right}
				value={left}
				onChange={onChange}
				onInput={onChange}
			/>
			<div>
				{left} / {right}
			</div>
		</div>
	);
};
