import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {logout, logoutSuccess} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {HeaderComponent} from './Component';

class HeaderContainer extends PureComponent<tContainerProps> {
  logout = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    // trigger logout immediately on client side while server works
    logoutSuccess({isAuthenticated: false});

    try {
      await this.props.logoutDispatch();
    } catch (err) {
      loglevel.error(err);
    }

    window.location.reload();
  }

  render() {
    return (
      <HeaderComponent
        geo={this.props.geo}
        logout={this.logout}
        session={this.props.session}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  geo: store.geo.data,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  logoutDispatch: () => dispatch(logout()),
});

const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);

export default Header;
