const { timeConverter } = require('..');

describe('timeConverter', () => {
	test('convert positive number', () => {
		expect(timeConverter(1)).toEqual('0:01');
		expect(timeConverter(10)).toEqual('0:10');
		expect(timeConverter(100)).toEqual('1:40');
		expect(timeConverter(60)).toEqual('1:00');
	});
	test('convert negative number', () => {
		expect(timeConverter(-10)).toEqual('0:00');
	});
	test('convert big number', () => {
		expect(timeConverter(3672)).toEqual('1:01:12');
	});
});
