import containerQueries from "@tailwindcss/container-queries"
import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin.js"

export const tailwindExtensions = {
	content: [],
	theme: {
		extend: {
			minWidth: (utils) => utils.theme("width"),
			maxWidth: (utils) => utils.theme("width"),
			minHeight: (utils) => utils.theme("height"),
			maxHeight: (utils) => utils.theme("height"),
		},
	},
	plugins: [
		containerQueries,

		plugin(function fluidCols(api) {
			api.addBase({
				":root": {
					"--tw-fluid-cols-repeat": "auto-fill",
				},
			})

			api.addUtilities({
				".fluid-cols-auto-fill": {
					"--tw-fluid-cols-repeat": "auto-fill",
				},
				".fluid-cols-auto-fit": {
					"--tw-fluid-cols-repeat": "auto-fit",
				},
			})

			api.matchUtilities(
				{
					"fluid-cols": (value) => ({
						"grid-template-columns": `repeat(var(--tw-fluid-cols-repeat), minmax(${value}, 1fr))`,
					}),
				},
				{ values: api.theme("width") },
			)
		}),

		plugin(function size(api) {
			api.matchUtilities(
				{ s: (value) => ({ width: value, height: value }) },
				{ values: { ...api.theme("width"), ...api.theme("height") } },
			)
		}),

		plugin(function ariaCurrentPage(api) {
			api.addVariant("aria-current-page", '&[aria-current="page"]')
		}),
	],
} satisfies Config
