/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts,tsx}"],
    important: "#root",
    theme: {
        extend: {},
        colors: {
            jet: "#323031",
            sunglow: "#ffd166",
            "french-gray": "#bbb5bd",
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
