import loadable from '@loadable/component';

const HomeComponent = loadable(() =>
  import(/* webpackChunkName: "Home" */'~app/pages/Home'),
);

export const Home = {
  component: HomeComponent,
  exact: true,
  path: "/",//['/', '/app-shell'],
};
