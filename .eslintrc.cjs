module.exports = {
  extends: [require.resolve("./eslint")],
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/test/test-project/**",
  ],
  root: true,
}
