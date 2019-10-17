import loadable from '@loadable/component';
import React from 'react';

const UserComponent = loadable(() =>
  import(/* webpackChunkName: "User" */'../pages/User'), {
  fallback: (
    <>Loading...</>
  ),
});

export const User = {
  component: UserComponent,
  exact: true,
  path: '/user/:id',
};
