import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Events, Memberships, Profile} from './_subpages';
import {tProps} from './_types';

export const UserAdminComponent = memo((props: tProps) => {
  const isEvents = props.match.params.section === 'events';
  const isProfile = props.match.params.section === 'profile';
  const isMemberships = props.match.params.section === 'memberships';

  return (
    <div className="contain fx mT4">
      <aside className="mR5">
        <ul role="navigation">
          <li>
            {!isProfile && (
              <Link to="profile">
                Profile
              </Link>
            )}
            {isProfile && 'Profile'}
          </li>
          <li>
            {!isEvents && (
              <Link to="events">
                Events
              </Link>
            )}
            {isEvents && 'Events'}
          </li>
          <li>
            {!isMemberships && (
              <Link to="memberships">
                Memberships
              </Link>
            )}
            {isMemberships && 'Memberships'}
          </li>
        </ul>
      </aside>
      <div className="col">
        {isEvents && (
          <Events
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
            session={props.session}
          />
        )}
      </div>
    </div>
  );
});
