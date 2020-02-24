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
    const {usersByOrgId} = this.props;
    const members = usersByOrgId.filter(u => u.role !== 'pending');

    return (
      <OrganizationInfoComponent
        match={this.props.match}
        org={this.props.org}
        members={members}
        params={this.props.params}
        role={this.props.role}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.usersByOrgId.isLoading,
  usersByOrgId: store.usersByOrgId.data,
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
