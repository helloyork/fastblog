import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        keyframes: {
            shimmer: {
                "100%": {
                    transform: "translateX(100%)",
                },
            },
        },
        colors: {
            primary: {
                DEFAULT: "#0070f3",
                dark: "#003c8f",
            },
            secondary: {
                DEFAULT: "#ff0080",
                dark: "#ff0055",
            },
            foreground: {
                DEFAULT: "#000",
                dark: "#fff",
            },
            background: {
                DEFAULT: "#fff",
                dark: "#000",
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()]
};
export default config;
