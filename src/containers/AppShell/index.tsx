import React, { memo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Routes } from 'react-router-dom';

import { RouteWithSubRoutes } from '~app/components';
import { MatchMediaProvider } from '~app/context';
import { routes } from '~app/routes';

const AppShell = memo(() => (
  <HelmetProvider context={{}}>
    <MatchMediaProvider>
      <Routes>
        {routes.map((route: ts.route, i) => (
          <RouteWithSubRoutes
            key={i}
            {...route}
          />
        ))}
      </Routes>
    </MatchMediaProvider>
  </HelmetProvider>
));

export default AppShell;

// export const AppShellHot = hot(module)(AppShellComponent);
