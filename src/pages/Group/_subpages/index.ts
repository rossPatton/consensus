import loadable from '@loadable/component';

export const Meetings = loadable(() =>
  import(/* webpackChunkName: "Group Meetings" */'./Meetings'),
);

export const Members = loadable(() =>
  import(/* webpackChunkName: "Group Members" */'./Members'),
);
