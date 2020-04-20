import React, {memo} from 'react';

import {Orgs} from '~app/components';

import {tComponentProps} from './_types';

export const UserComponent = memo(({orgs, user}: tComponentProps) => (
  <>
    <h1 className="mb-2 fs2 capitalize">
      @{user.username}
    </h1>
    {user.name && (
      <>
        <h2 className="text-3 mb-1">
          Real Name
        </h2>
        <p>{user.name}</p>
      </>
    )}
    {user.emails
      && !user.privateEmail
      && (
        <>
          <h3>Email</h3>
          <p>{user.emails[0]}</p>
        </>
      )}
    {user.website && (
      <>
        <h3 className="mb-1">
          Personal Website
        </h3>
        <p>{user.website}</p>
      </>
    )}
    {user.bio && (
      <div className="w-full">
        <h3>Bio</h3>
        {user.bio && user.bio.split('\n').map((p, i) => (
          <p key={i} className="text-gray-5">{p}</p>
        ))}
      </div>
    )}
    {!user.privateMemberships
      && orgs.length > 0
      && (
        <div className="w-full">
          <h3 className="mb-2">Memberships</h3>
          <Orgs orgs={orgs} />
        </div>
      )}
  </>
));
