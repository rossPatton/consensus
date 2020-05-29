import React, {memo} from 'react';
import {connect} from 'react-redux';

import {ErrorBoundary, GenericLoader} from '~app/containers';
import {SearchFilter} from '~app/containers';
import {getGroupsByUserId} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {MembershipsComponent} from './Component';

const MembershipsContainer = memo((props: tContainerProps) => (
  <ErrorBoundary
    isSubPage
    status={props?.groupsByUserIdThunk?.error?.status}>
    <GenericLoader
      isLoading={props.groupsByUserIdThunk.isLoading}
      render={() => (
        <SearchFilter
          searchKey="name"
          items={props.groupsByUserIdThunk.data}
          render={searchProps => (
            <MembershipsComponent
              onSearchChange={searchProps.onSearchChange}
              groups={searchProps.items}
              roles={props.roles}
            />
          )}
        />
      )}
    />
  </ErrorBoundary>
));

const mapStateToProps = (store: tStore) => ({
  groupsByUserIdThunk: store.groupsByUserId,
  roles: store.roles.data,
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getGroupsByUserIdDispatch: (query: ts.groupsByUserIdQuery) =>
    dispatch(getGroupsByUserId(query)),
});

const Memberships = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MembershipsContainer);

export default Memberships;
