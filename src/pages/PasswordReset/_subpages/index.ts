import loadable from '@loadable/component';

export const EmailTokenComponent = loadable(() =>
  import(/* webpackChunkName: "EmailToken" */'./EmailToken'),
);

export const ResetPasswordComponent = loadable(() =>
  import(/* webpackChunkName: "ResetPassword" */'./ResetPassword'),
);
