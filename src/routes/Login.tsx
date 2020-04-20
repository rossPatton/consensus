import loadable from '@loadable/component';

const LoginComponent = loadable(() =>
  import(/* webpackChunkName: "Login" */'~app/pages/Login'),
);

export const Login = {
  component: LoginComponent,
  path: '/login',
};
