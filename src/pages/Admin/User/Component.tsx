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
  const {profile} = props.session;
  const {orgsByUserIdThunk} = props;

  // <li className="p1">
  //           {!isAccount && (
  //             <Link to="/admin/account">
  //               Account
  //             </Link>
  //           )}
  //           {isAccount && 'Account'}
  //         </li>
  //         <li className="p1">
  //           {!isProfile && (
  //             <Link to="/admin/profile">
  //               Profile
  //             </Link>
  //           )}
  //           {isProfile && 'Profile'}
  //         </li>

  return (
    <div className="contain fx aiStart mT4">
      <aside className="c3 bgWhite br8 p3 mR3">
        <h1 className="copyBlack fx aiCtr fs4 fw600 pB3 mB3 brdB1">
          <div className="bgGrey3 circ p3 mR3" />
          <div>
            <Link className="noUnderline mB2" to={`/user/${profile.id}`}>
              {profile.name || profile.username}
            </Link>
            <div>
              <Link
                to="/admin/account"
                className="mR2 fs7 fw600">
                Edit account
              </Link>
              <Link
                to="/admin/profile"
                className="fs7 fw600">
                Edit profile
              </Link>
            </div>
          </div>
        </h1>
        {!orgsByUserIdThunk.isLoading
          && orgsByUserIdThunk.data.length > 0
          && (
            <ul role="navigation">
              <li className="fs4 copyBlack fw600 mB3">
                Your groups
              </li>
              {orgsByUserIdThunk.data.slice(0, 3).map((group, i) => (
                <li key={i}>
                  <Link
                    to={`/org/${group.id}`}
                    className="br8 p2 fx aiCtr noUnderline hvrBgGrey1 trans2">
                    <div className="mR3">
                      <div className="bgGrey3 circ p3" />
                    </div>
                    <h2 className="fs5 copyBlack lh1">
                      {group.name}
                    </h2>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin/memberships"
                  className="pL2 fs6 fs600">
                  Manage Groups
                </Link>
              </li>
            </ul>
          )}
      </aside>
      <div className="col bgWhite br8 p3">
        {isAccount && (
          <Account />
        )}
        {isEvents && (
          <Events />
        )}
        {isProfile && (
          <Profile />
        )}
        {isMemberships && (
          <Memberships />
        )}
      </div>
    </div>
  );
});
