import {
  Admin,
  Decision,
  Directory,
  ErrorPage,
  Event,
  Home,
  Login,
  Organization,
  Signup,
  User,
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
    path: '/signup/:type?',
  },
  {
    component: Admin,
    exact: true,
    path: '/admin/:section/:page?',
    private: true,
    redirect: '/login',
  },
  {
    component: Event,
    exact: true,
    path: '/event/:id',
  },
  {
    component: Decision,
    exact: true,
    path: '/decision/:id',
  },
  {
    component: Directory,
    exact: true,
    path: '/directory/:country/:region?/:city?/:page?',
  },
  // organization page is reachable directly via id or by geographical location
  {
    component: Organization,
    exact: true,
    path: '/org/:id/:section/:page?',
  },
  {
    component: Organization,
    exact: true,
    path: '/org/:country/:region/:city/:slug/:section/:page?',
  },
  {
    component: User,
    exact: true,
    path: '/user/:id',
  },
  // NoMatch === our 404 page
  // any match that we can't find, 404, or else we can manually redirect to /404
  {
    component: ErrorPage,
    path: '/500',
  },
];

