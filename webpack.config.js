const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	module: {
		...defaultConfig.module,
		rules: [
			// Output the PDF.js worker as .js so servers without .mjs MIME type support can serve it.
			{
				test: /pdf\.worker\.mjs$/,
				type: 'asset/resource',
				generator: {
					filename: '[contenthash].js',
				},
			},
			...defaultConfig.module.rules,
		],
	},
};
