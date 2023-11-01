declare const _default: {
    semi: false;
    trailingComma: "all";
    useTabs: true;
    htmlWhitespaceSensitivity: "ignore";
    plugins: string[];
    overrides: ({
        files: string;
        options: {
            useTabs: false;
            parser?: undefined;
        };
    } | {
        files: string;
        options: {
            parser: "astro";
            useTabs?: undefined;
        };
    })[];
};
export default _default;
