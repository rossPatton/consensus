import React, {Component} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {Route, Switch} from 'react-router-dom';

import {RouteWithSubRoutes} from '../../components';
import NoMatch from '../../pages/404';
import {routes} from '../../routes';
import {Footer, Header, Nav} from './_components';

export default class AppShell extends Component<any, {showNav: boolean}> {
  state = {
    showNav: false,
  };

  toggleNav = () => {
    this.setState({
      showNav: !this.state.showNav,
    });
  }

  render() {
    return (
      <HelmetProvider context={{}}>
        <>
          <Header
            {...this.props}
            toggleNav={this.toggleNav}
          />
          {this.state.showNav && <Nav />}
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
