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
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/no-redeclare": "warn",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { args: "none" }],
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
    "unicorn/no-null": "off",
  },
  settings: {
    react: { version: "v18.2.0" },
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: require.resolve("@typescript-eslint/parser"),
      parserOptions: {
        project: "./tsconfig.json",
      },
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "@typescript-eslint/no-floating-promises": "warn",
      },
    },
  ],
}
