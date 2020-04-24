import loadable from '@loadable/component';

export const DesktopEvents = loadable(() =>
  import(/* webpackChunkName: "Desktop Meetings Component" */'./Desktop'),
);

export const MobileEvents = loadable(() =>
  import(/* webpackChunkName: "Mobile Meetings Component" */'./Mobile'),
);

