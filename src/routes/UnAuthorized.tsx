import loadable from '@loadable/component';

// TODO, redirect users here instead of just going back
export const UnAuthorizedComponent = loadable(() =>
  import(/* webpackChunkName: "UnAuthorized" */'@app/pages/401'),
);

export const UnAuthorized = {
  component: UnAuthorizedComponent,
  path: '/401',
};
