import loadable from '@loadable/component';

const LoginResetComponent = loadable(() =>
  import(/* webpackChunkName: "LoginReset" */'~app/pages/LoginReset'),
);

export const LoginReset = {
  component: LoginResetComponent,
  path: '/login-reset/:section?',
};
