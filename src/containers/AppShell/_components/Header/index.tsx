import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {logout} from '../../../../redux';
import {tContainerProps} from './_types';
import {HeaderComponent} from './Component';

class HeaderContainer extends PureComponent<tContainerProps> {
  logout = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    this.props.logoutDispatch()
      .then(() => window.location.reload())
      .catch(loglevel.error);
  }

  render() {
    const {isAuthenticated = false} = _.get(this.props, 'session', {} as tSession);

    return (
      <HeaderComponent
        isAuthenticated={isAuthenticated}
        logout={this.logout}
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
