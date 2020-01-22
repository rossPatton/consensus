import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {logout} from '../../../../redux';
import {getRolesSuccess} from '../../../../redux/async/roles/getRoles/actions';
import {tContainerProps} from './_types';
import {HeaderComponent} from './Component';

class HeaderContainer extends PureComponent<tContainerProps> {
  logout = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    this.props.logout()
      .then(() => this.props.getRolesSuccess([]))
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
  getRolesSuccess: (emptyRoles: []) => dispatch(getRolesSuccess(emptyRoles)),
  logout: () => dispatch(logout()),
});

const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);

export default Header;
