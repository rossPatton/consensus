import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {logOutOfSession} from '../../../../redux';
import {getRolesSuccess} from '../../../../redux/async/roles/actions';
import {tContainerProps} from './_types';
import {HeaderComponent} from './Component';

export class HeaderContainer extends PureComponent<tContainerProps> {
  logout = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    this.props.logOutOfSession()
      .then(() => this.props.getRolesSuccess([]))
      .catch(console.error);
  }

  render() {
    return (
      <HeaderComponent
        logout={this.logout}
        session={this.props.session}
        toggleNav={this.props.toggleNav}
      />
    );
  }
}

const mapStateToProps = (store: {session: tThunk<tSession>}) => ({
  session: store.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getRolesSuccess: (emptyRoles: []) => dispatch(getRolesSuccess(emptyRoles)),
  logOutOfSession: () => dispatch(logOutOfSession()),
});

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
