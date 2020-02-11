import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '../../components';
import {ErrorBoundary, GenericLoader} from '../../containers';
import {tProps, tStore} from './_types';
import {OrgAdmin} from './Organization';
import {UserAdmin} from './User';

const AdminContainer = (props: tProps) => {
  const {match, sessionThunk} = props;

  return (
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
          const isOrgAdmin = type === 'org';
          const isUserAdmin = type === 'user';

          return (
            <>
              {isOrgAdmin && <OrgAdmin match={match} />}
              {isUserAdmin && <UserAdmin match={match} />}
            </>
          );
        }}
      />
    </ErrorBoundary>
  );
};

const mapStateToProps = (store: tStore) => ({
  sessionThunk: store.session,
});

const Admin = connect(mapStateToProps)(AdminContainer);
export default Admin;
