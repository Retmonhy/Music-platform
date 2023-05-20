const { login } = require('../account');
const axios = require('axios');
jest.mock('axios');
const loginMock = {
	isSuccess: true,
	accessToken: 'accessToken',
	refreshToken: 'refreshToken',
	user: {
		email: 'email',
		firstname: 'firstname',
		surname: 'surname',
		id: 'id',
		isActivated: true,
		tracks: [],
	},
};
describe('Account action creators: ', () => {
	test('correct return value without error:', () => {
		axios.post.mockReturnValue({ data: loginMock });
		login({ email: 'correct-login', password: 'correct-password' }).then(data => {
			expect(data).toEqual({
				type: 'AUTHORIZATION',
				payload: loginMock,
			});
		});
	});
});
