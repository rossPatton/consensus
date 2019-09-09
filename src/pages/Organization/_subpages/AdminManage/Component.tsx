import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Events, Members, Profile} from './_subpages';
import {tComponentProps} from './_types';

export const AdminManageComponent = memo((props: tComponentProps) => {
  const { country, city, region, slug, section } = props.match.params;
  const isEvents = section === 'manageEvents';
  const isProfile = section === 'manageOrganization';
  const isMembers = section === 'manageMembers';
  const to = `/org/${country}/${region}/${city}/${slug}`;

  return (
    <div className="fx">
      <aside className="mR5">
        <ul>
          <li>
            {isEvents && 'Events'}
            {!isEvents && (
              <Link to={`${to}/manageEvents`}>
                Events
              </Link>
            )}
          </li>
          <li>
            {isProfile && 'Profile'}
            {!isProfile && (
              <Link to={`${to}/manageOrganization`}>
                Profile
              </Link>
            )}
          </li>
          <li>
            {isMembers && 'Members'}
            {!isMembers && (
              <Link to={`${to}/manageMembers`}>
                Members
              </Link>
            )}
          </li>
        </ul>
      </aside>
      <div className="col row">
        {isEvents && (
          <Events
            {...props}
          />
        )}
        {isProfile && (
          <Profile
            {...props}
          />
        )}
        {isMembers && (
          <Members
            {...props}
          />
        )}
      </div>
    </div>
  );
});
