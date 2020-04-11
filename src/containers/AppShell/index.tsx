import React, {memo} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {Switch} from 'react-router-dom';

import {RouteWithSubRoutes} from '../../components';
import {MatchMediaProvider} from '../../context';
import {routes} from '../../routes';

const AppShell = memo(() => (
  <HelmetProvider context={{}}>
    <MatchMediaProvider>
      <Switch>
        {routes.map((route: tRoute, i) => (
          <RouteWithSubRoutes
            key={i}
            {...route}
          />
        ))}
      </Switch>
    </MatchMediaProvider>
  </HelmetProvider>
));

export default AppShell;

// export const AppShellHot = hot(module)(AppShellComponent);
