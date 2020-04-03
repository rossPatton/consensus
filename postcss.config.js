module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('css-mqpacker')(),
    require('postcss-preset-env')({ stage: 1 }),
    require('postcss-unique-selectors')(),
    require('postcss-warn-cleaner')({
      ignoreFiles: '**/*.styl',
    }),
  ],
};
