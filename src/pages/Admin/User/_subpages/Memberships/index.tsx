import _ from 'lodash';
import React, {memo} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../../components';
import {ErrorBoundary, GenericLoader} from '../../../../../containers';
import {SearchFilter} from '../../../../../containers';
import {getGroupsByUserId} from '../../../../../redux';
import {tContainerProps, tStore} from './_types';
import {MembershipsComponent} from './Component';

const MembershipsContainer = memo((props: tContainerProps) => (
  <ErrorBoundary status={_.get(props, 'orgsByUserIdThunk.error.status', 200)}>
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
      isLoading={props.orgsByUserIdThunk.isLoading}
      render={() => (
        <SearchFilter
          searchKey="name"
          items={props.orgsByUserIdThunk.data}
          render={searchProps => (
            <MembershipsComponent
              onSearchChange={searchProps.onSearchChange}
              orgs={searchProps.items}
              roles={props.roles}
            />
          )}
        />
      )}
    />
  </ErrorBoundary>
));

const mapStateToProps = (store: tStore) => ({
  orgsByUserIdThunk: store.orgsByUserId,
  roles: store.roles.data,
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getGroupsByUserIdDispatch: (query: tGroupsByUserIdQuery) =>
    dispatch(getGroupsByUserId(query)),
});

const Memberships = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MembershipsContainer);

export default Memberships;
