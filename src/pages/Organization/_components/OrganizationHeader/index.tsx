import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {getUsersByOrg} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {OrganizationHeaderComponent} from './Component';

class OrganizationHeaderContainer extends PureComponent<tContainerProps> {
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

const mapStateToProps = (store: tStore) => ({
  isLoading: store.usersByOrg.isLoading,
  usersByOrg: store.usersByOrg.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getUsersByOrg: (query: tIdQueryC) => dispatch(getUsersByOrg(query)),
});

const OrganizationHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationHeaderContainer);

export default OrganizationHeader;
