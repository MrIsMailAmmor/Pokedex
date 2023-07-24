/** @type {import('tailwindcss').Config} */
export default {
  plugins: [],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#1fb6ff",
        purple: "#7e5bef",
        pink: "#3B4CCA",
        orange: "#ff7849",
        green: "#13ce66",
        yellow: "#FFDE00",
        "gray-dark": "#273444",
        "gray-light": "#d3dce6",
        "gray-sm": "var(--color-gray-100)",
        "gray-low": "var(--color-gray-300)",
        "gray-md": "var(--color-gray-500)",
        "gray-lg": "var(--color-gray-800)",
        red: "#FF0000",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
};
