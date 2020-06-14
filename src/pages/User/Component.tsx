import React, {memo} from 'react';

import {Groups} from '~app/components';

import {tComponentProps} from './_types';

export const UserComponent = memo(({groups, user}: tComponentProps) => (
  <>
    <h1 className="mb-2 capitalize">
      @{user.username}
    </h1>
    {(user.name && user.name !== 'null') && (
      <div className="mb-2">
        <h2 className="text-3 mb-1">
          Real Name
        </h2>
        <p>{user.name}</p>
      </div>
    )}
    {user.website && (
      <div className="mb-2">
        <h3 className="mb-1">
          Personal Website
        </h3>
        <p>{user.website}</p>
      </div>
    )}
    {(user.bio && user.bio !== 'null') && (
      <div className="w-full mb-2">
        <h3>Bio</h3>
        {user.bio && user.bio.split('\n').map((p, i) => (
          <p key={i} className="text-gray-5">{p}</p>
        ))}
      </div>
    )}
    {!user.privateMemberships
      && groups.length > 0
      && (
        <div className="w-full">
          <h3 >Memberships</h3>
          <Groups groups={groups} />
        </div>
      )}
  </>
));
