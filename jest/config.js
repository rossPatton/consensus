const REGEX = {
  css: '^.+\\.css$',
  file: '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$',
  js: '^.+\\.js$',
};

const jestConfig = {
  moduleDirectories: [
    'jest',
    'node_modules',
    'src',
  ],

  // "setupFiles": [
  //   "<rootDir>/jest/__shim__/shim.js",
  //   "<rootDir>/jest/__setup__/setup.js",
  //   "<rootDir>/jest/__mocks__/global.mock.js",
  // ],

  // moduleNameMapper: {
  //   [REGEX.css]: 'identity-obj-proxy',
  //   [REGEX.file]: '<rootDir>/jest/__mocks__/file.mock.js',
  // },

  rootDir: '../',

  transform: {
    [REGEX.js]: 'babel-jest',
  },
};

module.exports = jestConfig;
