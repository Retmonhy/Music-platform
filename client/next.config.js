/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	images: {
		domains: ['http://localhost:5000', 'localhost'],
	},
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

module.exports = nextConfig;
