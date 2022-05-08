
module.exports = {
    content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    variants: {
        extend: {
            backgroundColor: ['even'],
        }
    },
    theme: {
        extend: {
            fontFamily: {
                primary: ['Inter'],
            },
            fontSize: {
                tiny: "0.625rem",
                xs: ".75rem",
                sm: ".875rem",
                base: "1rem",
                lg: "1.125rem",
                xl: "1.25rem",
                "2xl": "1.5rem",
                "3xl": "1.875rem",
                "4xl": "2.25rem",
                "5xl": "3rem",
                "6xl": "4rem",
                "7xl": "5rem",
            },
            colors: {
                button: "var(--color-button-text)",
                transparent: "transparent",
                primary: {
                    100: "var(--color-primary-100)",
                    200: "var(--color-primary-200)",
                    300: "var(--color-primary-300)",
                    400: "var(--color-primary-400)",
                    500: "var(--color-primary-500)",
                    600: "var(--color-primary-600)",
                    700: "var(--color-primary-700)",
                    800: "var(--color-primary-800)",
                    900: "var(--color-primary-900)",
                },
                secondary: {
                    DEFAULT: "var(--color-secondary)",
                    "washed-out": "var(--color-secondary-washed-out)",
                },
                accent: {
                    DEFAULT: "var(--color-accent)",
                    hover: "var(--color-accent-hover)",
                    disabled: "var(--color-accent-disabled)",
                },
                black: "#000",
            },
            spacing: {
                tiny: "0.625rem",
                xs: ".75rem",
                sm: ".875rem",
                base: "1rem",
                lg: "1.125rem",
                xl: "1.25rem",
                "2xl": "1.5rem",
                "3xl": "1.875rem",
                "4xl": "2.25rem",
                "5xl": "3rem",
                "6xl": "4rem",
                "7xl": "5rem",
            },
            keyframes: {
                flicker: {
                    '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
                        opacity: 0.99,
                        filter:
                            'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
                    },
                    '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
                        opacity: 0.4,
                        filter: 'none',
                    },
                },
            },
            animation: {
                flicker: 'flicker 3s linear infinite',
            },
        },
    },
    plugins: [],
};