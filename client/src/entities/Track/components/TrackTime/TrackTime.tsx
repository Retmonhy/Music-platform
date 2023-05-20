import { timeConverter } from '@shared/lib';

interface TrackTimeProps {
	currentTime: number;
	duration: number;
	isActive: boolean;
}
export const TrackTime: React.FC<TrackTimeProps> = ({ isActive, currentTime, duration }) => {
	return (
		<div className='track__time-container'>
			<span className='gray'>{isActive ? timeConverter(currentTime) : timeConverter(duration)}</span>
		</div>
	);
};

export default TrackTime;
