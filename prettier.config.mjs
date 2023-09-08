/** @type {import("prettier").Config} */
export default {
  semi: false,
  trailingComma: "all",
  plugins: [
    "prettier-plugin-jsdoc",
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
