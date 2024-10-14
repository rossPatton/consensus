/* eslint-disable */
const baseBabelEnvConfig = {
  corejs: '3',
  // enable more aggressive transformations
  // loose: true,
  targets: { 'browsers': 'last 2 versions' },
  // only pull in polyfills that we actually use
  useBuiltIns: 'usage',
};

const plugins = [
  ['module-resolver', {
    'alias': {
      '@app': './src',
    },
  }],
  'lodash',
  '@babel/proposal-optional-chaining',
  '@babel/transform-react-constant-elements',
  '@babel/transform-react-display-name',
  '@babel/proposal-object-rest-spread',
  '@babel/proposal-class-properties',
  '@babel/syntax-dynamic-import',
  '@loadable/babel-plugin',
];

module.exports = {
  env: {
    development: {
      sourceType: "unambiguous",
      presets: [
        ['@babel/env', baseBabelEnvConfig],
        '@babel/react',
        ['@babel/typescript', {
          allExtensions: true,
          isTSX: true,
        }],
      ],
      plugins,
    },
    production: {
      sourceType: "unambiguous",
      presets: [
        ['@babel/env', baseBabelEnvConfig],
        '@babel/react',
        ['@babel/typescript', {
          allExtensions: true,
          isTSX: true,
        }],
      ],
      plugins,
    },
    test: {
      presets: [
        ['@babel/env', {
          targets: { node: 'current' },
          modules: false,
        }],
        '@babel/react',
        ['@babel/typescript', {
          allExtensions: true,
          isTSX: true,
        }],
      ],
      plugins: [
        'transform-es2015-modules-commonjs',
        'dynamic-import-node',
        ...plugins,
      ],
    },
  },
};
