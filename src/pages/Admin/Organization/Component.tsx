import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Account, Decisions, Events, Members, Profile} from './_subpages';
import {tProps} from './_types';

export const OrgAdminComponent = memo((props: tProps) => {
  const {section} = props.match.params;
  const isAccount = section === 'account';
  const isDecisions = section === 'decisions';
  const isEvents = section === 'events';
  const isProfile = section === 'profile';
  const isMembers = section === 'memberships';

  return (
    <div className="contain mT4 fx">
      <aside className="mR5">
        <ul>
          <li className="p1">
            {!isAccount && (
              <Link to="/admin/account">
                Account
              </Link>
            )}
            {isAccount && 'Account'}
          </li>
          <li className="p1">
            {isDecisions && 'Decisions'}
            {!isDecisions && (
              <Link to="/admin/decisions">
                Decisions
              </Link>
            )}
          </li>
          <li className="p1">
            {isEvents && 'Events'}
            {!isEvents && (
              <Link to="/admin/events">
                Events
              </Link>
            )}
          </li>
          <li className="p1">
            {isProfile && 'Profile'}
            {!isProfile && (
              <Link to="/admin/profile">
                Profile
              </Link>
            )}
          </li>
          <li className="p1">
            {isMembers && 'Members'}
            {!isMembers && (
              <Link to="/admin/memberships">
                Members
              </Link>
            )}
          </li>
        </ul>
      </aside>
      <div className="col row">
        {isAccount && (
          <Account
            session={props.session}
          />
        )}
        {isDecisions && (
          <Decisions
            match={props.match}
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
        {isMembers && (
          <Members
            match={props.match}
            session={props.session}
          />
        )}
      </div>
    </div>
  );
});
