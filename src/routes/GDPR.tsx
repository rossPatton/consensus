import loadable from '@loadable/component';

// TODO, redirect users here instead of just going back
export const GDPRComponent = loadable(() =>
  import(/* webpackChunkName: "UnAuthorized" */'../pages/GDPR'),
);

export const GDPR = {
  component: GDPRComponent,
  path: '/gdpr',
};
