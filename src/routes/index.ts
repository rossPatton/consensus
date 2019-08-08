// top-level pages, usually static
import { Home, Login, Organization, Signup, UserAdmin } from '../pages';

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
    component: Organization,
    path: '/:country/:state/:city/:org/:section/:page?',
  },
];

