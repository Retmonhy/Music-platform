const { merge } = require('./mergeStyles');

describe('mergeStyles', () => {
	test('merge classes', () => {
		const classes = ['style1', 'style2'];
		expect(merge(...classes)).toBe('style1 style2');
	});
	test('merge more than 2 classes', () => {
		const classes = ['style1', 'style2', 'style3', 'style4'];
		expect(merge(...classes)).toBe('style1 style2 style3 style4');
	});
	test('merge with empty', () => {
		const classes = ['style1', ''];
		expect(merge(...classes)).toBe('style1 ');
		expect(merge(...classes.reverse())).toBe(' style1');
	});
	test('merge empty classes', () => {
		const classes = ['', ''];
		expect(merge(...classes)).toBe(' ');
	});
});
