import React, {memo} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {Switch} from 'react-router-dom';

import {RouteWithSubRoutes} from '../../components';
import {routes} from '../../routes';

const AppShell = memo((props: any) => (
  <HelmetProvider context={{}}>
    <Switch>
      {routes.map((route: tRoute, i) => (
        <RouteWithSubRoutes
          key={i}
          {...props}
          {...route}
        />
      ))}
    </Switch>
  </HelmetProvider>
));

export default AppShell;

// export const AppShellHot = hot(module)(AppShellComponent);
