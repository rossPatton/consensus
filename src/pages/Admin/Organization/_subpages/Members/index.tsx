import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../../components';
import {ErrorBoundary, GenericLoader, RoleFilter, SearchFilter} from '../../../../../containers';
import {
  deleteUserByOrgId,
  getUsersByOrgId,
  patchUserByOrgId,
} from '../../../../../redux';
import {tContainerProps, tStore} from './_types';
import {MembersComponent} from './Component';

const idPath = 'sessionThunk.data.profile.id';

class MembersContainer extends Component<tContainerProps> {
  constructor (props: tContainerProps) {
    super(props);
    const orgId = _.get(props, idPath, null);
    if (orgId) {
      props.getUsersByOrgIdDispatch({orgId});
    }
  }

  removeUser = (ev: React.MouseEvent<HTMLButtonElement>, userId: number) => {
    ev.preventDefault();
    const orgId = _.get(this.props, idPath, null);
    if (userId && orgId) {
      this.props.deleteUserByOrgIdDispatch({userId, orgId});
    }
  }

  setUserRole = (ev: React.ChangeEvent<HTMLSelectElement>, userId: number) => {
    ev.preventDefault();
    const role = ev.currentTarget.value as tRole;
    const orgId = _.get(this.props, idPath, null);
    if (orgId && userId && role) {
      this.props.patchUserByOrgIdDispatch({role, orgId, userId});
    }
  }

  render() {
    const {usersThunk} = this.props;

    return (
      <ErrorBoundary status={_.get(usersThunk, 'error.status', 200)}>
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
          isLoading={usersThunk.isLoading}
          render={() => (
            <RoleFilter
              items={usersThunk.data}
              render={roleProps => (
                <SearchFilter
                  searchKey="username"
                  items={roleProps.items}
                  render={searchProps => (
                    <MembersComponent
                      {...roleProps}
                      {...searchProps}
                      removeUser={this.removeUser}
                      match={this.props.match}
                      setUserRole={this.setUserRole}
                      users={searchProps.items}
                      userTotal={usersThunk.data.length}
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
  sessionThunk: store.session,
  usersThunk: store.usersByOrg,
});

const mapDispatchToProps = (dispatch: Function) => ({
  deleteUserByOrgIdDispatch: (query: tDeleteUserByOrgIdQuery) =>
    dispatch(deleteUserByOrgId(query)),

  getUsersByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    dispatch(getUsersByOrgId(query)),

  patchUserByOrgIdDispatch: (query: tPatchUserRoleQuery) =>
    dispatch(patchUserByOrgId(query)),
});

const Members = connect(mapStateToProps, mapDispatchToProps)(MembersContainer);
export default Members;
