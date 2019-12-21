import loadable from '@loadable/component';

const LoginComponent = loadable(() =>
  import(/* webpackChunkName: "Login" */'../pages/Login'),
);

export const Login = {
  component: LoginComponent,
  path: '/login',
};
