import type { Linter } from "eslint"

const config: Linter.Config = {
	plugins: ["react"],
	settings: {
		react: { version: "detect" },
	},
	overrides: [
		{
			files: ["*.{tsx,jsx}"],
			extends: ["plugin:react/recommended", "plugin:react/jsx-runtime"],
			rules: {
				"react/prop-types": "off",
			},
		},
	],
}

export = config
