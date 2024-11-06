/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'pure-red':'#FF0000'
      },
      height: {
        '18': '4.5rem', // Adding h-18 as 4.5rem (72px)
      },
    },
    fontFamily: {
      bona:['Bona Nova SC', 'serif']
    }
  },
  plugins: [],
}

