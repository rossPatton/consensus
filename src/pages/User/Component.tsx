import React, {memo} from 'react';

import {Orgs} from '../../components';
import {tComponentProps} from './_types';

export const UserComponent = memo(({orgs, user}: tComponentProps) => (
  <div className="contain mT4 mB5">
    <h1 className="mB3 fs2 ttCap">
      {/* if user entered a real name, use that, otherwise use id */}
      Profile for {user.name ? user.name : `user ${user.id}`}
    </h1>
    <h3>Username</h3>
    <p>{user.username}</p>
    {user.email
      && !user.privateEmail
      && (
        <>
          <h3>Email</h3>
          <p>{user.email}</p>
        </>
      )}
    {user.bio && (
      <div className="row">
        <h3>Bio</h3>
        {user.bio && user.bio.split('\n').map((p, i) => (
          <p key={i} className="copyBlack">{p}</p>
        ))}
      </div>
    )}
    {!user.privateMemberships
      && orgs.length > 0
      && (
        <div className="row">
          <h3>Memberships</h3>
          <Orgs orgs={orgs} />
        </div>
      )}
  </div>
));
