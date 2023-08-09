/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    important: "#root",
    theme: {
        extend: {},
        colors: {
            jet: "#323031" /* rgb(50, 48, 49) */,
            sunglow: "#ffd166" /* rgb(255, 209, 102) */,
            "french-gray": "#bbb5bd" /* rgb(187, 181, 189) */,
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
