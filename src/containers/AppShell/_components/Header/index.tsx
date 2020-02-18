import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {logout} from '../../../../redux';
import {logoutSuccess} from '../../../../redux/auth/logout/actions';
import {tContainerProps} from './_types';
import {HeaderComponent} from './Component';

class HeaderContainer extends PureComponent<tContainerProps> {
  logout = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    // trigger logout immediately on client side while server works
    logoutSuccess({isAuthenticated: false});

    this.props.logoutDispatch()
      .then(() => window.location.reload())
      .catch(loglevel.error);
  }

  render() {
    return (
      <HeaderComponent
        logout={this.logout}
        session={this.props.session}
      />
    );
  }
}

const mapStateToProps = (store: {session: tThunk<tSession>}) => ({
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
