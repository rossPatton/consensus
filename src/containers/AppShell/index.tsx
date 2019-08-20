import { HelmetProvider } from 'react-helmet-async';
import { Switch } from 'react-router-dom';
import React from 'react';
// import { hot } from 'react-hot-loader';

import { routes } from '../../routes';
import { RouteWithSubRoutes } from '../../components';
import { Footer, Header, Nav } from './_components';

export const AppShell = (props: any) => (
  <HelmetProvider context={{}}>
    <>
      <Header {...props} />
      <Nav />
      <main className="mT5 mB5 pB5">
        <Switch>
          {routes.map((route: tRoute, i) => (
            <RouteWithSubRoutes
              key={i}
              {...props}
              {...route}
            />
          ))}
        </Switch>
      </main>
      <Footer />
    </>
  </HelmetProvider>
);

// export const AppShellHot = hot(module)(AppShellComponent);
