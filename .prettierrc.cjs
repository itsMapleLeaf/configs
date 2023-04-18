/** @type {import('prettier').Config} */
module.exports = {
  quoteProps: "consistent",
  semi: false,
  trailingComma: "all",
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
}
