"use strict";
const config = {
    plugins: ["react"],
    settings: {
        react: { version: "detect" },
    },
    overrides: [
        {
            files: ["*.{tsx,jsx}"],
            extends: ["plugin:react/recommended", "plugin:react/jsx-runtime"],
            rules: {
                "react/prop-types": "off",
            },
        },
    ],
};
module.exports = config;
