import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Events, Memberships, Profile} from './_subpages';
import {tProps} from './_types';

export const UserAdminComponent = memo((props: tProps) => {
  const isEvents = props.match.params.section === 'events';
  const isProfile = props.match.params.section === 'profile';
  const isMemberships = props.match.params.section === 'memberships';

  // const { section } = props.match.params;
  // const to = `/admin/${section}/${region}/${city}/${slug}/${subRoute}`;

  return (
    <div className="contain fx mT4">
      <aside className="mR5">
        <ul role="navigation">
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
            session={props.session}
          />
        )}
      </div>
    </div>
  );
});
