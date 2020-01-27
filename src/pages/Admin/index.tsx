import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {tProps, tStore} from './_types';
import {OrgAdmin} from './Organization';
import {UserAdmin} from './User';

const AdminContainer = (props: tProps) => {
  const {match, session} = props;

  return (
    <>
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
    </>
  );
};

const mapStateToProps = (store: tStore) => ({
  session: store.session.data,
});

const Admin = connect(mapStateToProps)(AdminContainer);
export default Admin;
