import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getUsersByOrg } from '../../../../redux';
import { tContainerProps, tState } from './_types';
import { OrganizationHeaderComponent } from './Component';

export class OrganizationHeaderContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getUsersByOrg({id: props.org.id});
  }

  render() {
    return (
      <OrganizationHeaderComponent
        org={this.props.org}
        params={this.props.params}
      />
    );
  }
}

const mapStateToProps = (state: tState) => ({
  isLoading: state.usersByOrg.isLoading,
  usersByOrg: state.usersByOrg.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getUsersByOrg: (query: tIdQuery) => dispatch(getUsersByOrg(query)),
});

export const OrganizationHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationHeaderContainer);
