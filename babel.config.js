const CWD = process.cwd();

module.exports = {
  'presets': [
    ['@babel/env', {
      corejs: '3',
      // enable more aggressive transformations
      loose: true,
      targets: { 'browsers': 'last 2 versions' },
      // only pull in polyfills that are needed by our targets
      useBuiltIns: 'entry',
    }],
    '@babel/react',
    ['@babel/typescript', {
      allExtensions: true,
      isTSX: true,
    }],
  ],
  'plugins': [
    // 'react-hot-loader/babel',
    // '@babel/proposal-optional-chaining',
    '@babel/transform-react-constant-elements',
    '@babel/transform-react-display-name',
    '@babel/proposal-object-rest-spread',
    '@babel/proposal-class-properties',
    '@babel/syntax-dynamic-import',
    '@loadable/babel-plugin',
    // ['babel-plugin-module-resolver', {
    //   'cwd': 'babel.config.js',
    //   'root': ['src/'],
    //   'alias': {
    //     '@components': 'components/',
    //     '@containers': 'containers/',
    //   },
    // }],
  ],
};
