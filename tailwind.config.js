/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Include paths for your components and templates
  ],
    theme: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1020px',
        xl: '1440px',
      },
    extend: {
      //here the colours you want to add to the default colours for exampl 
      //
       colors: {
        softBlue: '#38B6FF',
        darkGreen: '#003C25',
        lightGreen: '#5EB23F',
      //   softRed: 'hsl(0, 94%, 66%)',
      //   grayishBlue: 'hsl(229, 8%, 60%)',
      //   veryDarkBlue: 'hsl(229, 31%, 21%)',
      },

    //   fontFamily: {
    //     sans: ['Rubik', 'sans-serif'],
    // },
  },
  plugins: [],
}};

