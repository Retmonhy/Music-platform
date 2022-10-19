import { ChangeEventHandler } from 'react';
import { timeConverter } from '../helper';

interface ITrackProgressProps {
	left: string | number;
	right: string | number;
	onChange: ChangeEventHandler<HTMLInputElement>;
	converter?: Function;
}

export const TrackProgress: React.FC<ITrackProgressProps> = ({
	left,
	right,
	onChange,
	converter = i => i,
}) => {
	return (
		<div>
			<input type='range' min={0} max={right} value={left} onInput={onChange} />
			<div>
				{converter(left)} / {converter(right)}
			</div>
		</div>
	);
};
