import loadable from '@loadable/component';

const UserComponent = loadable(() =>
  import(/* webpackChunkName: "User" */'../pages/User')
);

export const User = {
  component: UserComponent,
  exact: true,
  path: '/user/:id',
};
