/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    important: "#root",
    theme: {
        extend: {},
        colors: {
            primary: "#ffd166",
            secondary: "#323031",
            tertiary: "#bbb5bd",
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
