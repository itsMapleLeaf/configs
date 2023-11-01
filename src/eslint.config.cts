import type { Linter } from "eslint"

const config: Linter.Config = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:astro/recommended",
		"plugin:astro/jsx-a11y-recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
		project: true,
	},
	plugins: ["@typescript-eslint", "jsx-a11y"],
	rules: {
		"@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
		"@typescript-eslint/consistent-type-definitions": "off",
		"@typescript-eslint/consistent-type-imports": [
			"warn",
			{ fixStyle: "inline-type-imports" },
		],
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/no-confusing-void-expression": "off",
		"@typescript-eslint/no-floating-promises": "warn",
		"@typescript-eslint/no-redeclare": "warn",
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				args: "none",
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-import-type-side-effects": "error",
		"@typescript-eslint/no-unsafe-return": "warn",
		"@typescript-eslint/no-unsafe-member-access": "warn",
		"@typescript-eslint/no-unsafe-call": "warn",
		"@typescript-eslint/no-unsafe-assignment": "warn",
		"@typescript-eslint/no-unsafe-argument": "warn",
		"@typescript-eslint/prefer-nullish-coalescing": [
			"error",
			{ ignorePrimitives: { string: true, boolean: true } },
		],
		"@typescript-eslint/no-throw-literal": "off",
		"jsx-a11y/no-onchange": "off",
		"no-console": ["warn", { allow: ["warn", "error", "info"] }],
		"no-redeclare": "off",
		"no-undef": "off",
		"no-unused-vars": "off",
		"no-useless-rename": "warn",
		"object-shorthand": "warn",
	},
	overrides: [
		{
			files: ["*.astro"],
			parser: "astro-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
		},
	],
}

export = config
