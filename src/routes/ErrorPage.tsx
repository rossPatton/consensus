import loadable from '@loadable/component';

const ErrorPageComponent = loadable(() =>
  import(/* webpackChunkName: "ErrorPage" */'../pages/500'),
);

export const ErrorPage = {
  component: ErrorPageComponent,
  path: '/500',
};
