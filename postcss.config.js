module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-discard-comments'),
    require('tailwindcss'),
    require('postcss-preset-env')({ stage: 1 }),
    require('postcss-unique-selectors')(),
    require('postcss-warn-cleaner')(),
  ],
};
