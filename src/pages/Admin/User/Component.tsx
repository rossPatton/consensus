import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Account, Events, Memberships, Profile} from './_subpages';
import {tProps} from './_types';

export const UserAdminComponent = memo((props: tProps) => {
  const isAccount = props.match.params.section === 'account';
  const isEvents = props.match.params.section === 'events';
  const isProfile = props.match.params.section === 'profile';
  const isMemberships = props.match.params.section === 'memberships';

  return (
    <div className="contain fx mT4">
      <aside className="mR5">
        <ul role="navigation">
          <li>
            {!isAccount && (
              <Link to="/admin/account">
                Account
              </Link>
            )}
            {isAccount && 'Account'}
          </li>
          <li>
            {!isProfile && (
              <Link to="/admin/profile">
                Profile
              </Link>
            )}
            {isProfile && 'Profile'}
          </li>
          <li>
            {!isEvents && (
              <Link to="/admin/events">
                Events
              </Link>
            )}
            {isEvents && 'Events'}
          </li>
          <li>
            {!isMemberships && (
              <Link to="/admin/memberships">
                Memberships
              </Link>
            )}
            {isMemberships && 'Memberships'}
          </li>
        </ul>
      </aside>
      <div className="col">
        {isAccount && (
          <Account
            session={props.session}
          />
        )}
        {isEvents && (
          <Events
            match={props.match}
            session={props.session}
          />
        )}
        {isProfile && (
          <Profile
            session={props.session}
          />
        )}
        {isMemberships && (
          <Memberships
            match={props.match}
            session={props.session}
          />
        )}
      </div>
    </div>
  );
});
