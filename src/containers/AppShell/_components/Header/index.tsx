import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { setActiveSession } from '../../../../redux';
import { HeaderComponent } from './HeaderComponent';
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

const mapStateToProps = (state: { session: tSession }) => ({ session: state.session });

const mapDispatchToProps = (dispatch: Function) => ({
  logout: () => dispatch(setActiveSession({ isAuthenticated: false })),
});

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
