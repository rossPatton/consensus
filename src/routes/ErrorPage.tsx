import loadable from '@loadable/component';

export const ErrorPageComponent = loadable(() =>
  import(/* webpackChunkName: "ErrorPage" */'../pages/500'),
);

export const ErrorPage = {
  component: ErrorPageComponent,
  path: '/500',
};
