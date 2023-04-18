/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve("./eslint")],
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/test/test-project/**",
  ],
}
