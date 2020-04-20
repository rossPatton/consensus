import loadable from '@loadable/component';

const UserComponent = loadable(() =>
  import(/* webpackChunkName: "User" */'~app/pages/User'),
);

export const User = {
  component: UserComponent,
  exact: true,
  path: '/user/:id',
};
