import loadable from '@loadable/component';

const AdminComponent = loadable(() =>
  import(/* webpackChunkName: "Admin" */'../pages/Admin'),
);

export const Admin = {
  component: AdminComponent,
  exact: true,
  path: '/admin/:section/:page?',
  private: true,
  redirect: '/login',
};
