module.exports = {
  "collectCoverage": true,
  "coverageReporters": ["html"],
  "coverageDirectory": "coverage",
  globals: {
    __CLIENT__: true,
    __SERVER__: false,
    __DB__: 'test',
    __DEBUG__: true,
    __DEV__: false,
    __PROD__: false,
    __NODE_ENV__: 'test',
    __HCAPTCHA_KEY__: 'test',
  },
  moduleNameMapper: {
    '^~app/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: [
    '<rootDir>/jest.mocks.js',
  ],
  verbose: true,
};
