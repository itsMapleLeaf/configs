import plugin from "tailwindcss/plugin.js"

export function tailwindAnimate() {
	return plugin(function animate(api) {
		const exit = {
			opacity: "var(--tw-animate-from-opacity, 1)",
			transform: `
        translate(
          var(--tw-animate-from-translate-x, 0),
          var(--tw-animate-from-translate-y, 0)
        )
        scale(
          var(--tw-animate-from-scale-x, 1),
          var(--tw-animate-from-scale-y, 1)
        )
        rotate(var(--tw-animate-from-rotate, 0))
      `,
		}

		const enter = {
			opacity: "var(--tw-animate-to-opacity, 1)",
			transform: `
        translate(
          var(--tw-animate-to-translate-x, 0),
          var(--tw-animate-to-translate-y, 0)
        )
        scale(
          var(--tw-animate-to-scale-x, 1),
          var(--tw-animate-to-scale-y, 1)
        )
        rotate(var(--tw-animate-to-rotate, 0))
      `,
		}

		api.addBase({
			"@keyframes animate-in": {
				from: exit,
				to: enter,
			},
			"@keyframes animate-out": {
				from: enter,
				to: exit,
			},
		})

		api.addUtilities({
			".animate-in": {
				"animation-name": "animate-in",
				"animation-duration": `var(--tw-animation-duration, ${String(
					api.theme("transitionDuration.DEFAULT"),
				)})`,
				"animation-fill-mode": "forwards",
			},
			".animate-out": {
				"animation-name": "animate-out",
				"animation-duration": `var(--tw-animation-duration, ${String(
					api.theme("transitionDuration.DEFAULT"),
				)})`,
				"animation-fill-mode": "forwards",
			},
		})

		api.matchUtilities(
			{
				"animate-from-opacity": (value) => ({
					"--tw-animate-from-opacity": String(value),
				}),
				"animate-to-opacity": (value) => ({
					"--tw-animate-to-opacity": String(value),
				}),
			},
			{
				values: api.theme("opacity"),
			},
		)

		api.matchUtilities(
			{
				"animate-from-translate-x": (value) => ({
					"--tw-animate-from-translate-x": String(value),
				}),
				"animate-to-translate-x": (value) => ({
					"--tw-animate-to-translate-x": String(value),
				}),
				"animate-from-translate-y": (value) => ({
					"--tw-animate-from-translate-y": String(value),
				}),
				"animate-to-translate-y": (value) => ({
					"--tw-animate-to-translate-y": String(value),
				}),
			},
			{
				values: api.theme("translate"),
			},
		)

		api.matchUtilities(
			{
				"animate-from-scale": (value) => ({
					"--tw-animate-from-scale-x": String(value),
					"--tw-animate-from-scale-y": String(value),
				}),
				"animate-to-scale": (value) => ({
					"--tw-animate-to-scale-x": String(value),
					"--tw-animate-to-scale-y": String(value),
				}),
				"animate-from-scale-x": (value) => ({
					"--tw-animate-from-scale-x": String(value),
				}),
				"animate-to-scale-x": (value) => ({
					"--tw-animate-to-scale-x": String(value),
				}),
				"animate-from-scale-y": (value) => ({
					"--tw-animate-from-scale-y": String(value),
				}),
				"animate-to-scale-y": (value) => ({
					"--tw-animate-to-scale-y": String(value),
				}),
			},
			{
				values: api.theme("scale"),
			},
		)

		api.matchUtilities(
			{
				"animate-from-rotate": (value) => ({
					"--tw-animate-from-rotate": String(value),
				}),
				"animate-to-rotate": (value) => ({
					"--tw-animate-to-rotate": String(value),
				}),
			},
			{
				values: api.theme("rotate"),
			},
		)

		api.matchUtilities(
			{
				"animate-duration": (value) => ({
					"--tw-animation-duration": String(value),
				}),
			},
			{
				values: api.theme("transitionDuration"),
			},
		)

		api.matchUtilities(
			{
				"animate-ease": (value) => ({
					"animation-timing-function": String(value),
				}),
			},
			{
				values: api.theme("transitionTimingFunction"),
			},
		)

		api.matchUtilities(
			{
				"animate-fill": (value) => ({
					"animation-fill-mode": value,
				}),
			},
			{
				values: {
					none: "none",
					forwards: "forwards",
					backwards: "backwards",
					both: "both",
				},
			},
		)

		api.addUtilities({
			".animate-infinite": {
				"animation-iteration-count": "infinite",
			},
		})
	})
}
