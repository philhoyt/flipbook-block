/**
 * ESLint flat config (ESLint 10, `@wordpress/scripts` 32+). Extends the
 * wp-scripts default and keeps generated and vendored paths out of lint.
 */
/* eslint-disable import/no-extraneous-dependencies -- transitive dep of @wordpress/scripts */
const wpPlugin = require( '@wordpress/eslint-plugin' );
/* eslint-enable import/no-extraneous-dependencies */

module.exports = [
	{
		ignores: [ 'build/**', 'lib/**', 'vendor/**', 'node_modules/**' ],
	},
	{
		// ESLint flat config discovers only *.js, *.cjs, *.mjs on its own.
		// Name every other extension here or the rules below never see it.
		files: [ '**/*.jsx', '**/*.ts', '**/*.tsx' ],
	},
	...wpPlugin.configs.recommended,
];
