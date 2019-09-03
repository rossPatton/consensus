import {
  Directory,
  ErrorPage,
  Event,
  Home,
  Login,
  Organization,
  Signup,
  UserAdmin,
} from '../pages';

// TODO eventually split this file up once it starts getting big
export const routes = [
  {
    component: Home,
    exact: true,
    path: '/',
  },
  {
    component: Login,
    path: '/login',
  },
  {
    component: Signup,
    path: '/signup',
  },
  {
    component: UserAdmin,
    path: '/admin/:section',
    private: true,
    redirect: '/login',
  },
  {
    component: Event,
    exact: true,
    path: '/event/:id',
  },
  {
    component: Directory,
    exact: true,
    path: '/directory/:country/:region?/:city?',
  },
  {
    component: Organization,
    exact: true,
    path: '/org/:country/:region/:city/:slug/:section/:page?',
  },
  // NoMatch === our 404 page
  // any match that we can't find, 404, or else we can manually redirect to /404
  {
    component: ErrorPage,
    path: '/500',
  },
];

