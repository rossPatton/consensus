import loadable from '@loadable/component';

export const DesktopAside = loadable(() =>
  import(/* webpackChunkName: "UserAdmin DesktopAside" */'./Desktop'),
);

export const MobileAside = loadable(() =>
  import(/* webpackChunkName: "UserAdmin MobileAside" */'./Mobile'),
);
