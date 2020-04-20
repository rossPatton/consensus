import loadable from '@loadable/component';

const SignupComponent = loadable(() =>
  import(/* webpackChunkName: "Signup" */'~app/pages/Signup'),
);

export const Signup = {
  component: SignupComponent,
  path: '/signup/:type?',
};
