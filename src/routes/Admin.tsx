import loadable from '@loadable/component';

const AdminComponent = loadable(() =>
  import(/* webpackChunkName: "Admin" */'@app/pages/Admin'),
);

export const Admin = {
  component: AdminComponent,
  exact: true,
  path: '/admin/:section/:subsection?',
  private: true,
  redirect: '/login',
};
