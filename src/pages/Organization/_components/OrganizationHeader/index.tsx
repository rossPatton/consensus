import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {getUsersByOrgId} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {OrganizationHeaderComponent} from './Component';

class OrganizationHeaderContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getUsersByOrgIdDispatch({orgId: props.org.id});
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

const mapStateToProps = (store: tStore) => ({
  isLoading: store.usersByOrg.isLoading,
  usersByOrg: store.usersByOrg.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getUsersByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    dispatch(getUsersByOrgId(query)),
});

const OrganizationHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationHeaderContainer);

export default OrganizationHeader;
