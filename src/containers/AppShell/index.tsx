import React, {Component} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {Switch} from 'react-router-dom';

import {ErrorBoundary} from '..';
import {RouteWithSubRoutes} from '../../components';
import {routes} from '../../routes';
import {Footer, Header} from './_components';

export default class AppShell extends Component<any> {
  render() {
    return (
      <HelmetProvider context={{}}>
        <ErrorBoundary>
          <Header />
          <main className="mT5 mB5 pB5">
            <Switch>
              {routes.map((route: tRoute, i) => (
                <RouteWithSubRoutes
                  key={i}
                  {...this.props}
                  {...this.state}
                  {...route}
                />
              ))}
            </Switch>
          </main>
          <Footer />
        </ErrorBoundary>
      </HelmetProvider>
    );
  }
}

// export const AppShellHot = hot(module)(AppShellComponent);
