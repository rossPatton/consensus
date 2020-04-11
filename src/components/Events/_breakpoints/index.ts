import loadable from '@loadable/component';

export const DesktopEvents = loadable(() =>
  import(/* webpackChunkName: "Desktop Events Component" */'./Desktop'),
);

export const MobileEvents = loadable(() =>
  import(/* webpackChunkName: "Mobile Events Component" */'./Mobile'),
);

