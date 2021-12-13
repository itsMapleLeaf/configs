/** @type {import('eslint').Linter.Config} */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
    extraFileExtensions: [".cjs", ".mjs"],
  },
  plugins: ["react", "@typescript-eslint", "import"],
  rules: {
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
    "@typescript-eslint/no-floating-promises": "warn",
    "class-methods-use-this": "warn",
    "jsx-a11y/no-onchange": "off",
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "warn",
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-undef": "off",
    "no-unused-vars": "off",
    "no-useless-rename": "warn",
    "object-shorthand": "warn",
    "react-hooks/exhaustive-deps": ["warn"],
    "react/react-in-jsx-scope": ["off"],
    "require-await": "warn",
    "import/no-unused-modules": ["warn", { unusedExports: true }],
    "unicorn/prevent-abbreviations": [
      "warn",
      { replacements: { props: false, args: false, ref: false } },
    ],
    "unicorn/no-array-callback-reference": "off",
  },
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/release/**",
    "**/docs/**",
    "**/.cache/**",
    "**/generated/**",
  ],
  settings: {
    "react": { version: "latest" },
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
    "import/resolver": {
      typescript: {},
    },
  },
}
