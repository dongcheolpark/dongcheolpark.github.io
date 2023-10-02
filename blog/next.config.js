const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	reactStrictMode: true, swcMinify: false
}

module.exports = withContentlayer(nextConfig)
