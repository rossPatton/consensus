import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Account, Events, Memberships, Profile} from './_subpages';
import {tProps} from './_types';

export const UserAdminComponent = memo((props: tProps) => {
  const section: string = _.get(props, 'match.params.section', '');
  const isAccount = section === 'account';
  const isEvents = section === 'events';
  const isProfile = section === 'profile';
  const isMemberships = section === 'memberships';

  return (
    <div className="contain fx mT4">
      <aside className="mR5">
        <ul role="navigation">
          <li className="p1">
            {!isAccount && (
              <Link to="/admin/account">
                Account
              </Link>
            )}
            {isAccount && 'Account'}
          </li>
          <li className="p1">
            {!isProfile && (
              <Link to="/admin/profile">
                Profile
              </Link>
            )}
            {isProfile && 'Profile'}
          </li>
          <li className="p1">
            {!isEvents && (
              <Link to="/admin/events">
                Events
              </Link>
            )}
            {isEvents && 'Events'}
          </li>
          <li className="p1">
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
          <Account />
        )}
        {isEvents && (
          <Events
            match={props.match}
          />
        )}
        {isProfile && (
          <Profile />
        )}
        {isMemberships && (
          <Memberships
            match={props.match}
          />
        )}
      </div>
    </div>
  );
});
