/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve("./.eslintrc.base.cjs")],
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/test/test-project/**",
  ],
}
