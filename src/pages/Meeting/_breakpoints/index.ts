import loadable from '@loadable/component';

export const DesktopMeetingPage = loadable(() =>
  import(/* webpackChunkName: "Desktop Meeting Page" */'./Desktop'),
);

export const MobileMeetingPage = loadable(() =>
  import(/* webpackChunkName: "Mobile Meeting Page" */'./Mobile'),
);

