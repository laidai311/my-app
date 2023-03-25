/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                GoogleSansDisplay: ["GoogleSansDisplay", "sans-serif"],
                GoogleSansText: ["GoogleSansText", "sans-serif"],
            },
            animation: {
                "spin-steps-12": "spinSteps12 1.2s steps(12) infinite",
            },
            keyframes: {
                spinSteps12: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
            },
        },
    },
    plugins: [require("daisyui")],
};
