/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        'mdrev':{'max':'768px'},
        'smrev':{'max':'600px'},
      },
      colors:{
        primary:'#313652',
        secondary:'#008060'
      }
    },
  },
  plugins: [],
};
