import _ from 'lodash';
import React, {memo} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Account, Events, Members, Profile} from './_subpages';
import {tProps} from './_types';

const GroupAdminContainer = memo((props: tProps) => {
  const {section} = props.match.params;
  const isAccount = section === 'account';
  const isEvents = section === 'events';
  const isProfile = section === 'profile';
  const isMembers = section === 'memberships';

  return (
    <div className="contain mT4 fx">
      <aside className="bgWhite br8 p3 mR5">
        <h1>{props.session.profile.name}</h1>
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
          <Account />
        )}
        {isEvents && (
          <Events match={props.match} />
        )}
        {isProfile && (
          <Profile />
        )}
        {isMembers && (
          <Members match={props.match} />
        )}
      </div>
    </div>
  );
});

const mapStateToProps = (store: any) => ({
  session: store.session.data,
});

// const mapDispatchToProps = (dispatch: Function) => ({
//   getRolesDispatch: () => dispatch(getRoles()),
//   getRsvpsDispatch: () => dispatch(getRsvps()),
// });

export const GroupAdmin = connect(
  mapStateToProps,
  null,
)(GroupAdminContainer);
