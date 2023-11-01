import type { KeyValuePair } from "tailwindcss/types/config.js";
export interface RadixAnimationStates {
    enter: KeyValuePair;
    exit: KeyValuePair;
}
export interface RadixAnimationConfig {
    [animationName: string]: RadixAnimationStates;
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
export declare function radixAnimations(config: RadixAnimationConfig): {
    handler: import("tailwindcss/types/config.js").PluginCreator;
    config?: Partial<import("tailwindcss/types/config.js").Config> | undefined;
};
