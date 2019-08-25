import { Directory, Event, Home, Login, Organization, Signup, UserAdmin } from '../pages';

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
    path: '/admin',
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
    path: '/:country/:region?/:city?',
  },
  {
    component: Organization,
    path: '/:country/:region/:city/:org/:section/:page?',
  },
];

