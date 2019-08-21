import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { logOutOfSession } from '../../../../redux';
import { HeaderComponent } from './Component';
import { tContainerProps } from './_types';

export class HeaderContainer extends PureComponent<tContainerProps> {
  logout = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    this.props.logOutOfSession();
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

const mapStateToProps = (state: {session: tThunk<tSession>}) => ({
  session: state.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  logOutOfSession: () => dispatch(logOutOfSession()),
});

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
