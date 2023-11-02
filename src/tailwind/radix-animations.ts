import plugin from "tailwindcss/plugin.js"
import type { KeyValuePair } from "tailwindcss/types/config.js"

export interface RadixAnimationStates {
	enter: KeyValuePair
	exit: KeyValuePair
}

export interface RadixAnimationConfig {
	[animationName: string]: RadixAnimationStates
}

/**
 * Generate TailwindCSS class names for Radix animations.
 *
 * ```ts
 * // tailwind.config.js
 * import { radixAnimations } from "./tailwind/radix-animations"
 * export default {
 * 	// ...
 * 	plugins: [
 * 		radixAnimations({
 * 			fade: {
 * 				enter: { opacity: 1 },
 * 				exit: { opacity: 0 },
 * 			},
 * 		}),
 * 	],
 * }
 * ```
 *
 * ```tsx
 * // Toggle.tsx
 * import * as Disclosure from "@radix-ui/react-disclosure"
 * export function Toggle() {
 * 	return (
 * 		<Disclosure.Root>
 * 			<Disclosure.Trigger>Toggle</Disclosure.Trigger>
 * 			<Disclosure.Content className="radix-animation-fade">
 * 				<p>Content</p>
 * 			</Disclosure.Content>
 * 		</Disclosure.Root>
 * 	)
 * }
 * ```
 */
export function radixAnimations(config: RadixAnimationConfig) {
	return plugin(function radixAnimationsPlugin(api) {
		for (const [animationName, states] of Object.entries(config)) {
			// add two sets of keyframes, one for entry, one for exit
			api.addBase({
				[`@keyframes ${animationName}-enter`]: {
					from: states.exit,
					to: states.enter,
				},
				[`@keyframes ${animationName}-exit`]: {
					from: states.enter,
					to: states.exit,
				},
			})

			// add a utility that transitions in or out when [data-state] is open or closed respectively
			api.addUtilities({
				[`.radix-animation-${api.e(
					animationName,
				)}[data-state=open], .radix-animation-${api.e(
					animationName,
				)}[data-state=delayed-open]`]: {
					"animation-name": `${animationName}-enter`,
					"animation-duration": `var(--tw-animation-duration, ${String(
						api.theme("transitionDuration.DEFAULT"),
					)})`,
					"animation-fill-mode": "forwards",
					"animation-timing-function": `var(--tw-animation-timing-function, ${String(
						api.theme("transitionTimingFunction.out"),
					)})`,
					"transform-origin": "var(--radix-popper-transform-origin)",
				},
				[`.radix-animation-${api.e(animationName)}[data-state=closed]`]: {
					"animation-name": `${animationName}-exit`,
					"animation-duration": `var(--tw-animation-duration, ${String(
						api.theme("transitionDuration.DEFAULT"),
					)})`,
					"animation-fill-mode": "forwards",
					"animation-timing-function": `var(--tw-animation-timing-function, ${String(
						api.theme("transitionTimingFunction.in"),
					)})`,
					"transform-origin": "var(--radix-popper-transform-origin)",
				},
			})
		}
	})
}
