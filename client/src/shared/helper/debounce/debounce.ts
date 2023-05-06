export const debounce = (callback, delay = 0) => {
	let timer = null;
	return (...args) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => callback(...args), delay);
	};
};
