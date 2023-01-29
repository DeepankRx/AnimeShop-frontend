/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        'smrev':{'max':'600px'},
        'mdrev':{'max':'768px'},
        'lgrev':{'max':'1024px'},
      },
      colors:{
        primary:'#14274E',
        secondary:'#008060',
        background:'#14274E',
        reddish:'#d61355'
      }
    },
  },
  plugins: [],
};
