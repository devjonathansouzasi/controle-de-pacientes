module.exports = {
	env: {
		commonjs: true,
		node: true,
	},
	plugins: ['prettier'],
	extends: ['prettier', 'standard'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {
		quotes: ['single'],
		semi: 'always',
		'prettier/prettier': 'error',
		'max-len': ['error', 80],
	},
};
