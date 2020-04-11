import loadable from '@loadable/component';

export const Aside = loadable(() =>
  import(/* webpackChunkName: "UserAdmin Aside" */'./Aside'),
);
