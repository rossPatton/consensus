// import loadable from '@loadable/component';

import HomeComponent from '~app/pages/Home';

// const HomeComponent = loadable(() =>
//   import(/* webpackChunkName: "Home" */'~app/pages/Home'),
// );

export const Home = {
  component: HomeComponent,
  exact: true,
  path: '/',
};
