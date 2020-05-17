module.exports = {
	env: {
		node: true,
		browser: true,
	},
	plugins: ["@typescript-eslint"],
	extends: [
		"eslint:recommended",
		// "plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint",
		// "plugin:node/recommended",
		// "plugin:import/typescript",
	],
	rules: {},
	parserOptions: {
		parser: "@typescript-eslint/parser",
		ecmaVersion: 2020,
		sourceType: "module",
	},
};
