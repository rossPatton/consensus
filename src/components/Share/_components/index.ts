import loadable from '@loadable/component';

export const ShareButton = loadable(() =>
  import(/* webpackChunkName: "Share Button" */'./Button'),
);

export const SharePortal = loadable(() =>
  import(/* webpackChunkName: "Share Portal" */'./Portal'),
);
