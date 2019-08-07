// top-level pages, usually static
import { Config, Home, Login, Organization, Signup, Status, UserAdmin } from '../pages';

// TODO eventually split this file up once it starts getting big
export const routes = [
  {
    component: Home,
    exact: true,
    path: '/',
  },
  {
    component: Status,
    path: '/status',
  },
  {
    component: Config,
    path: '/config',
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
  // TODO make dynamic routes work without blowing your fucking brain out
  {
    exact: true,
    component: Organization,
    path: '/:country/:state/:city/:org',
  },
  {
    component: Organization,
    path: '/:country/:state/:city/:org/:section/:page?',
  },
  // {
  //   component: Events,
  //   path: '/us/ny/nyc/tech-workers-coalition/events',
  // },
  // {
  //   component: Forum,
  //   path: '/us/ny/nyc/tech-workers-coalition/forum',
  // },
  // {
  //   component: Resources,
  //   path: '/us/ny/nyc/tech-workers-coalition/resources',
  // },
];

