import React, {memo} from 'react';

import {Orgs} from '../../components';
import {tComponentProps} from './_types';

export const UserComponent = memo(({match, orgs, user}: tComponentProps) => (
  <div className="contain mT4 mB5">
    {(user.name || user.username) && (
      <h1 className="mB3 fs2 ttCap">
        {/* if user entered a name, use those, otherwise use username*/}
        Profile for {!user.privateName && user.name}
        {(user.privateName || !user.name) && user.username}
      </h1>
    )}
    {user.name
      && !user.privateName
      && (
        <>
          <h3>Username:</h3>
          <p>{user.username}</p>
        </>
      )}
    {user.email
      && !user.privateEmail
      && (
        <>
          <h3>Email:</h3>
          <p>{user.email}</p>
        </>
      )}
    {user.bio && (
      <div className="row">
        <h3>Bio:</h3>
        {user.bio && user.bio.split('\n').map((p, i) => (
          <p key={i} className="copyBlack">{p}</p>
        ))}
      </div>
    )}
    {!user.privateMemberships
      && (
        <div className="row">
          <h3>Organization Memberships:</h3>
          <Orgs match={match} orgs={orgs} />
        </div>
      )}
  </div>
));
