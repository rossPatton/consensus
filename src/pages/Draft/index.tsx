import _ from 'lodash';
import qs from 'query-string';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader, Template} from '~app/containers';
import {getRoles} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {DraftComponent} from './Component';

class DraftContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    if (!props.session.isAuthenticated) return;
    if (!props.rolesThunk.fetched) props.getRolesDispatch();
  }

  render() {
    const { isLoading, location: {search}, rolesThunk} = this.props;
    const rolesStatus = rolesThunk?.error?.status;
    const draft: {[key: string]: unknown} = qs.parse(search);

    return (
      <Template>
        <ErrorBoundary status={rolesStatus}>
          <Helmet
            meta={[
              { name: 'robots', content: 'noindex' },
            ]}
          />
          <GenericLoader
            isLoading={isLoading}
            render={() => {
              const userRoleMap = rolesThunk.fetched
              && _.find(
                rolesThunk.data,
                rm => rm.groupId === parseInt(draft.groupId as string, 10,
                ),
              );

              const userIsAModOrAdmin = userRoleMap ?
                userRoleMap.role === 'admin' || userRoleMap.role === 'facilitator'
                : false;

              if (!userIsAModOrAdmin) {
                return <Redirect to="/login" />;
              }

              return (
                <DraftComponent
                  meeting={draft as ts.meeting}
                />
              );
            }}
          />
        </ErrorBoundary>
      </Template>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.roles.isLoading,
  rolesThunk: store.roles,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getRolesDispatch: () => dispatch(getRoles()),
});

const Draft = connect(mapStateToProps, mapDispatchToProps)(DraftContainer);
export default Draft;
