import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getUsersByOrg } from '../../../../redux';
import { tContainerProps, tState } from './_types';
import { OrganizationHeaderComponent } from './Component';

// TODO this is too much nesting - maybe figure out a less verbose structure
// basically, this
// 1- gets basic org info needed for header
// 2- sets up the shared layout for all sub pages
// 3 - renders correct sub page based on react router match
export class OrganizationHeaderContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getUsersByOrg({id: props.org.id});
  }

  render() {
    return (
      <OrganizationHeaderComponent
        org={this.props.org}
        session={this.props.session}
        usersByOrg={this.props.usersByOrg}
      />
    );
  }
}

const mapStateToProps = (state: tState) => ({
  isLoading: state.usersByOrg.isLoading,
  session: state.session,
  usersByOrg: state.usersByOrg.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getUsersByOrg: (query: tIdQuery) => dispatch(getUsersByOrg(query)),
});

export const OrganizationHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationHeaderContainer);
