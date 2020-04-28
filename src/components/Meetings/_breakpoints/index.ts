import loadable from '@loadable/component';

export const DesktopMeetings = loadable(() =>
  import(/* webpackChunkName: "Desktop Meetings Component" */'./Desktop'),
);

export const MobileMeetings = loadable(() =>
  import(/* webpackChunkName: "Mobile Meetings Component" */'./Mobile'),
);

