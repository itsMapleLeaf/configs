import containerQueries from "@tailwindcss/container-queries"
import plugin from "tailwindcss/plugin"

/** @satisfies {import("tailwindcss").Config} */
const preset = {
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
      api.matchUtilities(
        {
          "fluid-cols": (value) => ({
            "grid-template-columns": `repeat(auto-fit, minmax(${value}, 1fr))`,
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
}
export default preset
