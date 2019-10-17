import loadable from '@loadable/component';
import React from 'react';

const LoginComponent = loadable(() =>
  import(/* webpackChunkName: "Login" */'../pages/Login'), {
  fallback: (
    <>Loading...</>
  ),
});

export const Login = {
  component: LoginComponent,
  path: '/login',
};
