export const timeConverter = (seconds: number) => {
	let minutes = Math.floor(seconds / 60).toString();
	let remainder = Math.floor(seconds % 60).toString();

	if (Number(remainder) < 10 && Number(remainder) > 0) {
		remainder = '0' + remainder;
	}
	if (remainder === '0') {
		remainder = '00';
	}

	return `${minutes}:${remainder}`;
};
