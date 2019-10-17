import loadable from '@loadable/component';
import React from 'react';

const HomeComponent = loadable(() =>
  import(/* webpackChunkName: "Home" */'../pages/Home'), {
  fallback: (
    <>Loading...</>
  ),
});

export const Home = {
  component: HomeComponent,
  exact: true,
  path: '/',
};
