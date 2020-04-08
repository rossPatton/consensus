import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '../../components';
import {ErrorBoundary, GenericLoader, Template} from '../../containers';
import {tProps, tStore} from './_types';
import {GroupAdmin} from './Organization';
import {UserAdmin} from './User';

const AdminContainer = (props: tProps) => {
  const {match, sessionThunk} = props;

  return (
    <Template>
      <ErrorBoundary status={_.get(sessionThunk, 'error.status', 200)}>
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
          isLoading={sessionThunk.isLoading}
          render={() => {
            const isAuthenticated = _.get(sessionThunk, 'data.isAuthenticated', false);

            if (!isAuthenticated) return <Redirect to="" />;

            const {type} = sessionThunk.data;
            const isGroupAdmin = type === 'org';
            const isUserAdmin = type === 'user';

            const renderWelcome = isGroupAdmin
              ? props.sessionThunk.data.isVerified
              : true;

            return (
              <>
                {renderWelcome && (
                  <div className="mb-2 text-center">
                    Welcome back to your {isGroupAdmin ? 'group' : 'user'} dashboard {sessionThunk.data.profile.name}
                  </div>
                )}
                {isGroupAdmin
                  && (
                    <GroupAdmin
                      location={props.location}
                      match={match}
                    />
                  )}
                {isUserAdmin
                  && (
                    <UserAdmin
                      history={props.history}
                      match={match}
                    />
                  )}
              </>
            );
          }}
        />
      </ErrorBoundary>
    </Template>
  );
};

const mapStateToProps = (store: tStore) => ({
  sessionThunk: store.session,
});

const Admin = connect(mapStateToProps)(AdminContainer);
export default Admin;
