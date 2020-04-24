import loadable from '@loadable/component';

export const Aside = loadable(() =>
  import(/* webpackChunkName: "GroupAdmin Aside" */'./Aside'),
);
