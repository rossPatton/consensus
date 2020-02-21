import loadable from '@loadable/component';

export const UnAuthorizedComponent = loadable(() =>
  import(/* webpackChunkName: "UnAuthorized" */'../pages/401'),
);

export const UnAuthorized = {
  component: UnAuthorizedComponent,
  path: '/401',
};
