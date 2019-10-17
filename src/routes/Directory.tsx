import loadable from '@loadable/component';
import React from 'react';

const DirectoryComponent = loadable(() =>
  import(/* webpackChunkName: "Directory" */'../pages/Directory'), {
  fallback: (
    <>Loading...</>
  ),
});

export const Directory = {
  component: DirectoryComponent,
  exact: true,
  path: '/directory/:country/:region?/:city?/:page?',
};
