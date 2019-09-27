import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Decisions, Events, Members, Profile} from './_subpages';
import {tProps} from './_types';

export const OrgAdminComponent = memo((props: tProps) => {
  const {section} = props.match.params;
  const isDecisions = section === 'manageDecisions';
  const isEvents = section === 'manageEvents';
  const isProfile = section === 'manageOrganization';
  const isMembers = section === 'manageMembers';
  const to = '/admin';

  return (
    <div className="contain mT4 fx">
      <aside className="mR5">
        <ul>
          <li>
            {isDecisions && 'Decisions'}
            {!isDecisions && (
              <Link to={`${to}/manageDecisions`}>
                Decisions
              </Link>
            )}
          </li>
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
        {isDecisions && (
          <Decisions
            {...props}
          />
        )}
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
