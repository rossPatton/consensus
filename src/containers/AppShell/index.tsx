import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';

// import { RouteWithSubRoutes } from '~app/components';
import { MatchMediaProvider } from '~app/context';
import { routes } from '~app/routes';

const AppShell = () => (
  <HelmetProvider context={{}}>
    <MatchMediaProvider>
      <Routes>
        {routes.map((route: ts.route, i) => {
          // console.log("🚀 ~ {routes.map ~ route:", route)
          const { path, component: Component } = route;

          return (
            <Route
              key={i}
              path={path as string}
              element={<Component />}
            />
          );
          // <RouteWithSubRoutes
          //   key={i}
          //   {...route}
          // />
        })}
      </Routes>
    </MatchMediaProvider>
  </HelmetProvider>
);

export default AppShell;

// export const AppShellHot = hot(module)(AppShellComponent);
