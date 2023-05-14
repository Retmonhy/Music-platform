const { debounce } = require('./debounce');
describe('dobounce function:', () => {
	let mockFn = null;
	const delay = 500;
	beforeAll(() => {
		mockFn = jest.fn();
	});
	test('amount of calls', done => {
		const debouncedFn = debounce(mockFn, delay);
		//четыре вызова - один результат
		debouncedFn('first');
		debouncedFn('second');
		debouncedFn('third');
		debouncedFn('fourth');
		setTimeout(() => {
			expect(mockFn).toHaveBeenCalledTimes(1);
			expect(mockFn).toHaveBeenCalledWith('fourth');
			done();
		}, delay);
	});
});
