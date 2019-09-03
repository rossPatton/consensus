import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {getOrgsByUser} from '../../../../../redux';
import {tContainerProps} from './_types';
import {MembershipsComponent} from './Component';

class MembershipsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getOrgsByUser();
  }

  render() {
    return (
      <MembershipsComponent
        orgs={this.props.orgs}
      />
    );
  }
}

const mapStateToProps = (store: any) => ({
  isLoading: store.orgs.isLoading,
  orgs: store.orgs.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getOrgsByUser: () => dispatch(getOrgsByUser()),
});

export const Memberships = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembershipsContainer);
