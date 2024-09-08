/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      colors: {
        "primary-900": "#333333",
        "primary-800": "#6D6D6D",
        "primary-300": "#CECECE",
        "primary-200": "#F5F5F5",
        "primary-100": "#FFFFFF",

        "accent-500": "#007FC7",
        "accent-600": "#026197",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
