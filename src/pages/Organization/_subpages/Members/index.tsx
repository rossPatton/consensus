import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../components';
import {ErrorBoundary, GenericLoader, RoleFilter, SearchFilter} from '../../../../containers';
import {deleteUserByOrgId, patchUserByOrgId} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {MembersComponent} from './Component';

class MembersContainer extends Component<tContainerProps, {role: tRole}> {
  state = {
    role: 'n/a' as tRole,
  };

  removeUser = (ev: React.MouseEvent<HTMLButtonElement>, userId: number) => {
    ev.preventDefault();
    const {deleteUserByOrgIdDispatch, session} = this.props;
    deleteUserByOrgIdDispatch({
      userId,
      orgId: session.profile.id,
    });
  }

  setUserRole = (ev: React.ChangeEvent<HTMLSelectElement>, userId: number) => {
    ev.preventDefault();
    const role = ev.currentTarget.value as tRole;
    const orgId = this.props.session.profile.id;
    this.props.patchUserByOrgIdDispatch({role, orgId, userId});
  }

  render() {
    const {match: {params}, usersByOrgId} = this.props;
    const {section} = params;

    const members = section === 'members'
      ? usersByOrgId.filter(u => u.role !== 'pending')
      : usersByOrgId.filter(u => u.role === 'pending');

    return (
      <ErrorBoundary status={_.get(usersByOrgId, 'error.status', 200)}>
        <Helmet
          canonical=""
          title=""
          meta={[
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { property: 'og:title', content: '' },
            { property: 'og:description', content: '' },
          ]}
        />
        <GenericLoader
          isLoading={this.props.isLoading}
          render={() => (
            <RoleFilter
              items={members}
              render={roleProps => (
                <SearchFilter
                  searchKey="username"
                  items={roleProps.items}
                  render={searchProps => (
                    <MembersComponent
                      {...roleProps}
                      {...searchProps}
                      match={this.props.match}
                      org={this.props.org}
                      removeUser={this.removeUser}
                      role={this.props.role}
                      section={section}
                      setUserRole={this.setUserRole}
                      users={searchProps.items}
                      userTotal={usersByOrgId.length}
                    />
                  )}
                />
              )}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.usersByOrgId.isLoading,
  usersByOrgId: store.usersByOrgId.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  deleteUserByOrgIdDispatch: (query: tDeleteUserByOrgIdQuery) =>
    dispatch(deleteUserByOrgId(query)),
  patchUserByOrgIdDispatch: (query: tPatchUserRoleQuery) =>
    dispatch(patchUserByOrgId(query)),
});

const Members = connect(mapStateToProps, mapDispatchToProps)(MembersContainer);
export default Members;
