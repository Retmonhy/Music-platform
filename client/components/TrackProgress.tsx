interface ITrackProgressProps {
	left: string | number;
	right: string | number;
	onChange: Function;
}

export const TrackProgress: React.FC<ITrackProgressProps> = ({
	left,
	right,
	onChange,
}) => {
	return (
		<div>
			<input type='range' min={left} max={right} value={left} />
			<div>
				{left} / {right}
			</div>
		</div>
	);
};
