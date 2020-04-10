import loadable from '@loadable/component';

export const MobileEventPage = loadable(() =>
  import(/* webpackChunkName: "Mobile Event Page" */'./Mobile'),
);

export const DesktopEventPage = loadable(() =>
  import(/* webpackChunkName: "Desktop Event Page" */'./Desktop'),
);

