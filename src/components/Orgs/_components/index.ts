import loadable from '@loadable/component';

export const Org = loadable(() =>
  import(/* webpackChunkName: "Orgs Sub Component" */'./Org'),
);
