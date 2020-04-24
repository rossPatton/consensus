import loadable from '@loadable/component';

export const DesktopEventPage = loadable(() =>
  import(/* webpackChunkName: "Desktop Meeting Page" */'./Desktop'),
);

export const MobileEventPage = loadable(() =>
  import(/* webpackChunkName: "Mobile Meeting Page" */'./Mobile'),
);

