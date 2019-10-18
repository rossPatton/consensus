import loadable from '@loadable/component';

const NoMatchComponent = loadable(() =>
  import(/* webpackChunkName: "NoMatch" */'../pages/404')
);

export const NoMatch = {
  component: NoMatchComponent,
  path: '/500',
};
