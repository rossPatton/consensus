import loadable from '@loadable/component';
import React from 'react';

const NoMatchComponent = loadable(() =>
  import(/* webpackChunkName: "NoMatch" */'../pages/404'), {
  fallback: (
    <>Loading...</>
  ),
});

export const NoMatch = {
  component: NoMatchComponent,
  path: '/500',
};
