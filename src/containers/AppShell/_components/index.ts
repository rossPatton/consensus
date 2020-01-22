import loadable from '@loadable/component';

export const Footer = loadable(() =>
  import(/* webpackChunkName: "Footer" */'./Footer'),
);

export const Header = loadable(() =>
  import(/* webpackChunkName: "Header" */'./Header'),
);
