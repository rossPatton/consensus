import React, {Component} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {Route, Switch} from 'react-router-dom';

import {RouteWithSubRoutes} from '../../components';
import NoMatch from '../../pages/404';
import {routes} from '../../routes';
import {Footer, Header} from './_components';

export default class AppShell extends Component<any> {
  render() {
    return (
      <HelmetProvider context={{}}>
        <>
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
              <Route component={() => <NoMatch />} />
            </Switch>
          </main>
          <Footer />
        </>
      </HelmetProvider>
    );
  }
}

// export const AppShellHot = hot(module)(AppShellComponent);
