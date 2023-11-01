export declare const tailwindExtensions: {
    content: never[];
    theme: {
        extend: {
            minWidth: (utils: import("tailwindcss/types/config.js").PluginUtils) => any;
            maxWidth: (utils: import("tailwindcss/types/config.js").PluginUtils) => any;
            minHeight: (utils: import("tailwindcss/types/config.js").PluginUtils) => any;
            maxHeight: (utils: import("tailwindcss/types/config.js").PluginUtils) => any;
        };
    };
    plugins: {
        handler: import("tailwindcss/types/config.js").PluginCreator;
        config?: Partial<import("tailwindcss/types/config.js").Config> | undefined;
    }[];
};
