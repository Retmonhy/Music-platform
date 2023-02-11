import { timeConverter } from '../../../shared';
import styles from '../../../shared/styles/TrackItem.module.scss';

interface TrackTimeProps {
	currentTime: number;
	duration: number;
	isActive: boolean;
}
export const TrackTime: React.FC<TrackTimeProps> = ({
	isActive,
	currentTime,
	duration,
}) => {
	return (
		<div className={styles.trackTimeWrap}>
			<span className={styles.gray}>
				{isActive ? timeConverter(currentTime) : timeConverter(duration)}
			</span>
		</div>
	);
};
