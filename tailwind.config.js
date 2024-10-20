/** @type {import('tailwindcss').Config} */

const tailwindConfigObject = {
  content: [
    "./index.html",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        "primary-50": "#9999ff",
        "primary-25": "#CCCCFF",
        primary: "#6666ff",
        secondary: "#99ccff",
        red: "#FF3333",
        green: "#009900",
        orange: "#ff8000",
        pink: "#ff3399",
        "priority-low": "#00cc00",
        "priority-medium": "#ff9933",
        "priority-high": "#ff0000",
        "gray-lighter": "#E7E7F9",
        "gray-light": "#e0e0e0",
        "alert-error": "#FFCCCC",
        "alert-info": "#FFFFCC",
        "alert-success": "#CCFFE5",
      },
    },
  },
  plugins: [],
}

export default tailwindConfigObject
