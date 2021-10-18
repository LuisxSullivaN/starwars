const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  purge: createGlobPatternsForDependencies(__dirname),
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'star-wars':
          'url(/assets/star-wars.jpg)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],

};
