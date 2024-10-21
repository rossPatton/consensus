import loadable from '@loadable/component';

export const Group = loadable(() =>
  import(/* webpackChunkName: "Group Sub Component" */'./Group'),
);
