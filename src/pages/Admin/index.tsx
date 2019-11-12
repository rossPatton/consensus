import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {tProps, tStore} from './_types';
import {OrgAdmin} from './Organization';
import {UserAdmin} from './User';

const AdminContainer = (props: tProps) => {
  const {match, session} = props;

  return (
    <ErrorBoundary>
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
      {!session.isAuthenticated && <Redirect to="" />}
      {session.isAuthenticated && (
        <>
          {session.type === 'org' && (
            <OrgAdmin
              match={match}
              session={session}
            />
          )}
          {session.type === 'user' && (
            <UserAdmin
              match={match}
              session={session}
            />
          )}
        </>
      )}
    </ErrorBoundary>
  );
};

const mapStateToProps = (store: tStore) => ({
  session: store.session.data,
});

const Admin = connect(mapStateToProps)(AdminContainer);
export default Admin;
