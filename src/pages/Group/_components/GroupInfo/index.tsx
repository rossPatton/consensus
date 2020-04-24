import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {getUsersByGroupId} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {GroupInfoComponent} from './Component';

class GroupInfoContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getUsersByGroupIdDispatch({groupId: props.group.id});
  }

  render() {
    const {usersByGroupId} = this.props;
    const members = usersByGroupId.filter(u => u.role !== 'pending');

    return (
      <GroupInfoComponent
        match={this.props.match}
        group={this.props.group}
        members={members}
        params={this.props.params}
        role={this.props.role}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.usersByGroupId.isLoading,
  usersByGroupId: store.usersByGroupId.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getUsersByGroupIdDispatch: (query: tUsersByGroupIdQuery) =>
    dispatch(getUsersByGroupId(query)),
});

const GroupInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupInfoContainer);

export default GroupInfo;
