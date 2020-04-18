const baseBabelConfig = {
  corejs: '3',
  // enable more aggressive transformations
  loose: true,
  targets: { 'browsers': 'last 2 versions' },
  // only pull in polyfills that are needed by our targets
  useBuiltIns: 'entry',
};

const presets = [
  '@babel/react',
  ['@babel/typescript', {
    allExtensions: true,
    isTSX: true,
  }],
];

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
      presets: [
        ['@babel/env', baseBabelConfig],
        ...presets,
      ],
      plugins,
    },
    production: {
      presets: [
        ['@babel/env', baseBabelConfig],
        ...presets,
      ],
      plugins,
    },
    test: {
      presets: [
        ['@babel/env', {
          ...baseBabelConfig,
          modules: false,
        }],
        ...presets,
      ],
      plugins: [
        'transform-es2015-modules-commonjs',
        'dynamic-import-node',
        ...plugins,
      ],
    },
  }
};
