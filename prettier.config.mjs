/** @type {import("prettier").Config} */
export default {
	semi: false,
	trailingComma: "all",
	useTabs: true,
	htmlWhitespaceSensitivity: "ignore",
	plugins: [
		"prettier-plugin-jsdoc",
		"prettier-plugin-astro",
		"prettier-plugin-tailwindcss",
	],
	overrides: [
		{
			files: "package.json",
			options: {
				useTabs: false,
			},
		},
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
}
