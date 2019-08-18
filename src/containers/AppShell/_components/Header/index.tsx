import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { HeaderComponent } from './Component';
import { tProps } from './_types';

export class HeaderContainer extends PureComponent<tProps> {
  render() {
    return (
      <HeaderComponent
        logout={this.props.logout}
        session={this.props.session}
      />
    );
  }
}

const mapStateToProps = (state: {session: tSession}) => ({
  session: state.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  logout: () => () => {},
});

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
