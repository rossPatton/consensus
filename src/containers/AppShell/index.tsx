import React, {memo} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {Switch} from 'react-router-dom';

import {RouteWithSubRoutes} from '~app/components';
import {MatchMediaProvider} from '~app/context';
import {routes} from '~app/routes';

const AppShell = memo(() => (
  <HelmetProvider context={{}}>
    <MatchMediaProvider>
      <Switch>
        {routes.map((route: ts.route, i) => (
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
