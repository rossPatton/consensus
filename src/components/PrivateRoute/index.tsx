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

const mapStateToProps = (store: {session: tThunk<tSession>}) => ({
  session: store.session.data,
});

export const PrivateRoute = connect(mapStateToProps)(PrivateRouteContainer);
