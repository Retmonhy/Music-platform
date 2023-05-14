const { MusicInfo } = require('./TitleAndDescription');
const { screen, render, fireEvent } = require('@testing-library/react');

describe('MusicInfo comp:', () => {
	test('title and subtitle are rendered', () => {
		render(<MusicInfo title='MusicInfo Title' description='MusicInfo SubTitle' />);
		const title = screen.getByTestId('musicinfo-title');
		const subtitle = screen.getByTestId('musicinfo-subtitle');
		expect(title).toBeInTheDocument();
		expect(subtitle).toBeInTheDocument();
	});
	test('click on the title', () => {
		const mockFn = jest.fn();
		render(<MusicInfo title='MusicInfo Title' description='MusicInfo SubTitle' titleClick={mockFn} />);
		const title = screen.getByTestId('musicinfo-title');
		fireEvent.click(title);
		expect(mockFn).toBeCalled();
		expect(mockFn).toBeCalledTimes(1);
	});
});
