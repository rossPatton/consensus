import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Paginate} from '~app/containers';
import {deleteOrgByUserId} from '~app/redux';

import {tContainerProps, tState} from './_types';
import {GroupsComponent} from './Component';

class GroupsContainer extends PureComponent<tContainerProps, tState> {
  state = {
    hoverIndex: null as number | null,
    // we sometimes split the groups into 2, by membership vs pending
    // short of splitting this entire thing into 2 nearly identical components
    // (which might be the best approach honestly)
    // i'm using this to only render the hover state if the type matches
    groupType: 'member' as ts.role,
  };

  // ie, return an array of only groups that pending
  filterNonPending = () => {
    return this.props.groups.filter(group => {
      const roleMap = _.find(this.props.roles, r => r.groupId === group.id) || {};
      const {role} = roleMap as ts.roleMap;
      return role === 'pending';
    });
  }

  // only render groups that the user is a member of
  filterPending = () => {
    return this.props.groups.filter(group => {
      const roleMap = _.find(this.props.roles, r => r.groupId === group.id) || {};
      const {role} = roleMap as ts.roleMap;
      return role !== 'pending';
    });
  }

  leaveOrg = (ev: React.MouseEvent<HTMLButtonElement>, groupId: number) => {
    ev.preventDefault();
    if (groupId) {
      this.props.deleteOrgByUserIdDispatch({groupId});
    }
  }

  setHover = (hoverIndex: number | null = null, groupType: ts.role) =>
    this.setState({
      groupType,
      hoverIndex,
    });

  render() {
    const {
      asList,
      count,
      isEditable,
      groups: originalGroups,
      roles,
      showCategory,
      showLocation,
      showPending = false,
      showType,
    } = this.props;

    if (!originalGroups
      || (originalGroups instanceof Array && originalGroups.length === 0)) {
      return null;
    }

    // if we're rendering groups based on relation to the user, then we want to
    // be able to potentially split by user role, pending or not pending
    let pendingOrgs = [] as ts.group[];
    if (showPending) {
      pendingOrgs = this.filterNonPending();
    }

    return (
      <Paginate
        count={count}
        items={this.filterPending()}
        render={(groupsToRender: ts.group[]) => (
          <GroupsComponent
            {...this.state}
            asList={asList}
            isEditable={isEditable}
            leaveOrg={this.leaveOrg}
            groups={groupsToRender}
            pendingOrgs={pendingOrgs}
            roles={roles}
            setHover={this.setHover}
            showCategory={showCategory}
            showLocation={showLocation}
            showType={showType}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: {roles: ts.thunk<ts.roleMap[]>}) => ({
  roles: store.roles.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  deleteOrgByUserIdDispatch: (query: ts.deleteUserByGroupIdQuery) =>
    dispatch(deleteOrgByUserId(query)),
});

const Group = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupsContainer);

export default Group;
