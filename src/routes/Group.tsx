import loadable from '@loadable/component';

const GroupComponent = loadable(() =>
  import(/* webpackChunkName: "Group" */'~app/pages/Group'),
);

export const Group = {
  component: GroupComponent,
  exact: true,
  // eslint-disable-next-line
  path: '/group/:idOrSlug/:section?',
};
