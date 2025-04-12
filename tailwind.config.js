/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins-Regular", "sans-serif"],
                "poppins-bold": ["Poppins-Bold", "sans-serif"],
                "poppins-extrabold": ["Poppins-ExtraBold", "sans-serif"],
                "poppins-extralight": ["Poppins-ExtraLight", "sans-serif"],
                "poppins-medium": ["Poppins-Medium", "sans-serif"],
                "poppins-semibold": ["Poppins-SemiBold", "sans-serif"],
                "poppins-light": ["Poppins-Light", "sans-serif"],
                "poppins-black": ["Poppins-Black", "sans-serif"],
                "poppins-thin": ["Poppins-Thin", "sans-serif"],
            },
            colors: {
                white: {
                    100: "#FFFFFF",
                    200: "#FAFAFA",
                    300: "#F5F5F5",
                    400: "#F2F2F2",
                },
                black: {
                    100: "#000000",
                    200: "#263238",
                    300: "#333333",
                },
                primary: {
                    100: "#EB5757",
                    200: "#FF3E3E",
                    300: "#FF3830",
                    400: "#ED8473",
                    500: "#F9AB9A",
                    600: "#FFC3BD",
                    700: "#FEE9DE",
                },
                gray: {
                    200: '#F2F2F2',
                    500: "#E0E0E0",
                },
                yellow: "#F2C94C",
            },
        },
    },
    plugins: [],
};