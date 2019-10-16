import loadable from '@loadable/component';
import React from 'react';

// fallbacks for now, until SSR is setup
const Admin = loadable(() =>
  import(/* webpackChunkName: "Admin" */'../pages/Admin'), {
  fallback: (
    <>Loading...</>
  ),
});

const Decision = loadable(() =>
  import(/* webpackChunkName: "Decision" */'../pages/Decision'), {
  fallback: (
    <>Loading...</>
  ),
});

const Directory = loadable(() =>
  import(/* webpackChunkName: "Directory" */'../pages/Directory'), {
  fallback: (
    <>Loading...</>
  ),
});

const ErrorPage = loadable(() =>
  import(/* webpackChunkName: "ErrorPage" */'../pages/500'), {
  fallback: (
    <>Loading...</>
  ),
});

const Event = loadable(() =>
  import(/* webpackChunkName: "Event" */'../pages/Event'), {
  fallback: (
    <>Loading...</>
  ),
});

const Home = loadable(() =>
  import(/* webpackChunkName: "Home" */'../pages/Home'), {
  fallback: (
    <>Loading...</>
  ),
});

const Login = loadable(() =>
  import(/* webpackChunkName: "Login" */'../pages/Login'), {
  fallback: (
    <>Loading...</>
  ),
});

const Organization = loadable(() =>
  import(/* webpackChunkName: "Organization" */'../pages/Organization'), {
  fallback: <div>Loading...</div>,
});

const Signup = loadable(() =>
  import(/* webpackChunkName: "Signup" */'../pages/Signup'), {
  fallback: (
    <>Loading...</>
  ),
});

const User = loadable(() =>
  import(/* webpackChunkName: "User" */'../pages/User'), {
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

