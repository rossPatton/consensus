import loadable from '@loadable/component';
import React from 'react';

const AdminComponent = loadable(() =>
  import(/* webpackChunkName: "Admin" */'../pages/Admin'), {
  fallback: (
    <>Loading...</>
  ),
});

export const Admin = {
  component: AdminComponent,
  exact: true,
  path: '/admin/:section/:page?',
  private: true,
  redirect: '/login',
};
