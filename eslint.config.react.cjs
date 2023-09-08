/** @type {import("eslint").Linter.Config} */
module.exports = {
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
