import loadable from '@loadable/component';
import React from 'react';

const ErrorPageComponent = loadable(() =>
  import(/* webpackChunkName: "ErrorPage" */'../pages/500'), {
  fallback: (
    <>Loading...</>
  ),
});

export const ErrorPage = {
  component: ErrorPageComponent,
  path: '/500',
};
