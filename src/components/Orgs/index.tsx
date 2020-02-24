import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Paginate} from '../../containers';
import {deleteOrgByUserId} from '../../redux';
import {tContainerProps, tState} from './_types';
import {OrgsComponent} from './Component';

class OrgsContainer extends PureComponent<tContainerProps, tState> {
  state = {
    hoverIndex: null as number | null,
    // we sometimes split the groups into 2, by membership vs pending
    // short of splitting this entire thing into 2 nearly identical components
    // (which might be the best approach honestly)
    // i'm using this to only render the hover state if the type matches
    groupType: 'member' as tRole,
  };

  // ie, return an array of only groups that pending
  filterNonPending = () => {
    return this.props.orgs.filter(org => {
      const roleMap = _.find(this.props.roles, r => r.orgId === org.id) || {};
      const {role} = roleMap as tRoleMap;
      return role === 'pending';
    });
  }

  // only render groups that the user is a member of
  filterPending = () => {
    return this.props.orgs.filter(org => {
      const roleMap = _.find(this.props.roles, r => r.orgId === org.id) || {};
      const {role} = roleMap as tRoleMap;
      return role !== 'pending';
    });
  }

  leaveOrg = (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => {
    ev.preventDefault();
    if (orgId) {
      this.props.deleteOrgByUserIdDispatch({orgId});
    }
  }

  setHover = (hoverIndex: number | null = null, groupType: tRole) =>
    this.setState({
      groupType,
      hoverIndex,
    })

  render() {
    const {
      asList,
      count,
      isEditable,
      orgs: originalOrgs,
      roles,
      showLocation,
      showPending = false,
    } = this.props;

    if (!originalOrgs
      || (originalOrgs instanceof Array && originalOrgs.length === 0)) {
      return null;
    }

    // if we're rendering groups based on relation to the user, then we want to
    // be able to potentially split by user role, pending or not pending
    let pendingOrgs = [] as tOrg[];
    if (showPending) {
      pendingOrgs = this.filterNonPending();
    }

    return (
      <Paginate
        count={count}
        items={this.filterPending()}
        render={(orgsToRender: tOrg[]) => (
          <OrgsComponent
            {...this.state}
            asList={asList}
            isEditable={isEditable}
            leaveOrg={this.leaveOrg}
            orgs={orgsToRender}
            pendingOrgs={pendingOrgs}
            roles={roles}
            setHover={this.setHover}
            showLocation={showLocation}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: {roles: tThunk<tRoleMap[]>}) => ({
  roles: store.roles.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  deleteOrgByUserIdDispatch: (query: tDeleteUserByOrgIdQuery) =>
    dispatch(deleteOrgByUserId(query)),
});

const Orgs = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrgsContainer);

export default Orgs;
