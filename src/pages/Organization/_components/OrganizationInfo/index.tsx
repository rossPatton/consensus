import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {getUsersByOrgId} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {OrganizationInfoComponent} from './Component';

class OrganizationInfoContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getUsersByOrgIdDispatch({orgId: props.org.id});
  }

  render() {
    const {usersByOrg} = this.props;
    const members = usersByOrg.filter(u => u.role !== 'pending');

    return (
      <OrganizationInfoComponent
        org={this.props.org}
        members={members}
        params={this.props.params}
        role={this.props.role}
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

const OrganizationInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationInfoContainer);

export default OrganizationInfo;
