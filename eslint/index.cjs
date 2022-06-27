// eslint-disable-next-line unicorn/prefer-module
/** @type {import('eslint').Linter.Config} */
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
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
    extraFileExtensions: [".cjs", ".mjs"],
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-redeclare": "warn",
    // having this enabled still separates imports,
    // so keeping it disabled for now
    // "canonical/prefer-inline-type-import": "warn",
    "class-methods-use-this": "warn",
    "jsx-a11y/no-onchange": "off",
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-redeclare": "off",
    "no-undef": "off",
    "no-unused-vars": "off",
    "no-useless-rename": "warn",
    "object-shorthand": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": ["off"],
    "unicorn/consistent-function-scoping": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/prevent-abbreviations": "off",
  },
  settings: {
    react: { version: "latest" },
  },
}
