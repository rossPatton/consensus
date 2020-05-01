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
    const { location: {search}, rolesThunk} = this.props;
    const draft: {[key: string]: unknown} = qs.parse(search);

    return (
      <Template>
        <ErrorBoundary status={rolesThunk?.error?.status}>
          <Helmet
            meta={[
              { name: 'robots', content: 'noindex' },
            ]}
          />
          <GenericLoader
            isLoading={!rolesThunk.fetched}
            render={() => {
              const userRoleMap = _.find(
                rolesThunk.data,
                rm => rm.groupId === parseInt(draft.groupId as string, 10),
              );

              const userIsAModOrAdmin = userRoleMap ?
                userRoleMap.role === 'admin' || userRoleMap.role === 'facilitator'
                : false;

              if (!userIsAModOrAdmin) return <Redirect to="/login" />;

              // @TODO use same Component for both drafts and meetings
              // just have the container be different
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
  rolesThunk: store.roles,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getRolesDispatch: () => dispatch(getRoles()),
});

const Draft = connect(mapStateToProps, mapDispatchToProps)(DraftContainer);
export default Draft;
