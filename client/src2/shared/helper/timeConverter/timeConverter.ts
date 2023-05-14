export const timeConverter = (seconds: number): string => {
	if (seconds < 0) return '0:00';
	let hours = Math.floor(seconds / 60 ** 2);
	seconds = seconds - hours * 60 ** 2;
	let minutes = Math.floor(seconds / 60);
	seconds = seconds - minutes * 60;

	let beautyTime = [];
	beautyTime.push(hours);
	beautyTime.push(hours > 0 && minutes < 10 ? '0' + minutes : minutes);
	beautyTime.push(seconds < 10 ? '0' + seconds : seconds);

	if (hours > 0) {
		return beautyTime.join(':');
	} else {
		return beautyTime.slice(1).join(':');
	}
};
