import loadable from '@loadable/component';
import React from 'react';

// fallbacks for now, until SSR is setup
const Admin = loadable(() => import('../pages/Admin'), {
  fallback: (
    <>Loading...</>
  ),
});

const Decision = loadable(() => import('../pages/Decision'), {
  fallback: (
    <>Loading...</>
  ),
});

const Directory = loadable(() => import('../pages/Directory'), {
  fallback: (
    <>Loading...</>
  ),
});

const ErrorPage = loadable(() => import('../pages/500'), {
  fallback: (
    <>Loading...</>
  ),
});

const Event = loadable(() => import('../pages/Event'), {
  fallback: (
    <>Loading...</>
  ),
});

const Home = loadable(() => import('../pages/Home'), {
  fallback: (
    <>Loading...</>
  ),
});

const Login = loadable(() => import('../pages/Login'), {
  fallback: (
    <>Loading...</>
  ),
});

const Organization = loadable(() =>
  import(/* webpackChunkName: "Organization" */ '../pages/Organization'), {
  fallback: <div>Loading...</div>,
});

const Signup = loadable(() => import('../pages/Signup'), {
  fallback: (
    <>Loading...</>
  ),
});

const User = loadable(() => import('../pages/User'), {
  fallback: (
    <>Loading...</>
  ),
});


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

