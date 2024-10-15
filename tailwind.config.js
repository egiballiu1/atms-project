/** @type {import('tailwindcss').Config} */
const tailwindConfigObject =  {
  content: [
    "./index.html",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      white:'#fff',
      black:'#000',
      'primary-50':'#9999ff',
      primary:'#6666ff',
      secondary:'#99ccff',
      red:'#FF3333',
      green:'#009900',
      orange:'#ff8000',
      pink:'#ff3399',
      'gray-light':'#e0e0e0'
    },
    extend: {},
  },
  plugins: [],
}

export default tailwindConfigObject

