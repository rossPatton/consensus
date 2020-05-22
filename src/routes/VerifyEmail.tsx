import loadable from '@loadable/component';

const VerifyEmailComponent = loadable(() =>
  import(/* webpackChunkName: "VerifyEmail" */'~app/pages/VerifyEmail'),
);

export const VerifyEmail = {
  component: VerifyEmailComponent,
  exact: true,
  path: '/verify-email/:section?',
  private: true,
  redirect: '/login',
};
