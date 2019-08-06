import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { tProps } from './_types';
import { PrivateRouteComponent } from './PrivateRouteComponent';

export class PrivateRouteContainer extends PureComponent<tProps> {
  render() {
    return (
      <PrivateRouteComponent
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state: { session: tSession }) => ({ session: state.session });
export const PrivateRoute = connect(mapStateToProps)(PrivateRouteContainer);
