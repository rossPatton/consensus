import _ from 'lodash';
import React, {Component} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';

import {RouteWithSubRoutes} from '../../components';
import {getGeo} from '../../redux';
import {routes} from '../../routes';
import {Footer, Header} from './_components';
import {tProps, tStore} from './_types';

class AppShellContainer extends Component<tProps> {
  constructor(props: tProps) {
    super(props);
    const {session} = props;
    const {city, postcode} = _.get(session, 'profile', {}) as tUser;
    const loggedIn = session.isAuthenticated;
    const isUser = session.type === 'user';
    const hasLocation = city || postcode;

    if (loggedIn && isUser && hasLocation) return;
    if (loggedIn && !isUser) return;

    // only get geo data for users, and only if we don't already have it
    props.getGeoDispatch();
  }

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
            </Switch>
          </main>
          <Footer />
        </>
      </HelmetProvider>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getGeoDispatch: () => dispatch(getGeo()),
});

const AppShell = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppShellContainer);

export default AppShell;

// export const AppShellHot = hot(module)(AppShellComponent);
