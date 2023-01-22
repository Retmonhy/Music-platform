/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	images: {
		domains: ['http://localhost:5000', 'localhost'],
	},
};

module.exports = nextConfig;

