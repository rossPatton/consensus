import loadable from '@loadable/component';
import React from 'react';

const SignupComponent = loadable(() =>
  import(/* webpackChunkName: "Signup" */'../pages/Signup'), {
  fallback: (
    <>Loading...</>
  ),
});

export const Signup = {
  component: SignupComponent,
  path: '/signup/:type?',
};
