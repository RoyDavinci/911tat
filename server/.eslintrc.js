module.exports = {
	env: {
		browser: true,
		es2021: true,
		amd: true,
		node: true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		"no-duplicate-imports": "error",
		eqeqeq: "error",
		"no-else-return": "error",
		"no-var": "error",
		"prefer-const": "error",
		"require-await": "error",
		"array-bracket-newline": ["error", "never"],
	},
};
