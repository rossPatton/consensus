import loadable from '@loadable/component';

const VerifyAccountComponent = loadable(() =>
  import(/* webpackChunkName: "VerifyAccount" */'../pages/VerifyAccount'),
);

export const VerifyAccount = {
  component: VerifyAccountComponent,
  path: '/verify-account/:section?',
};
