import {RouteWithSubRoutes} from '@app/components';
import {MatchMediaProvider, SessionProvider} from '@app/context';
import {routes} from '@app/routes';
import React, {memo} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {Switch} from 'react-router-dom';

const AppShell = memo(() => (
  <HelmetProvider context={{}}>
    <MatchMediaProvider>
      <SessionProvider>
        <Switch>
          {routes.map((route: tRoute, i) => (
            <RouteWithSubRoutes
              key={i}
              {...route}
            />
          ))}
        </Switch>
      </SessionProvider>
    </MatchMediaProvider>
  </HelmetProvider>
));

export default AppShell;

// export const AppShellHot = hot(module)(AppShellComponent);
