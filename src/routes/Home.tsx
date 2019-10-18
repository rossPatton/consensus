import loadable from '@loadable/component';

const HomeComponent = loadable(() =>
  import(/* webpackChunkName: "Home" */'../pages/Home')
);

export const Home = {
  component: HomeComponent,
  exact: true,
  path: '/',
};
