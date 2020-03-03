import loadable from '@loadable/component';

const PasswordResetComponent = loadable(() =>
  import(/* webpackChunkName: "PasswordReset" */'../pages/PasswordReset'),
);

export const PasswordReset = {
  component: PasswordResetComponent,
  path: '/password-reset/:section?',
};
