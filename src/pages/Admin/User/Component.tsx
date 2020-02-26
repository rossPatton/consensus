import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {PlaceholderImage} from '../../../components';
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

  return (
    <div className="contain fx aiStart mT4">
      <aside className="c3 bgWhite br8 p3 mR3">
        <div className="fx fs4 fw600 pB3 mB3 brdB1">
          <img
            alt=""
            className="bgGrey3 circ mR3"
            src="https://s3.amazonaws.com/uifaces/faces/twitter/sta1ex/128.jpg"
            width="70"
          />
          <div className="lh1">
            <h1>
              <Link
                to="/admin/events"
                className="copyBlack fs4 fw600 noUnderline mB2">
                {profile.name || profile.username}
              </Link>
            </h1>
            <div>
              <Link
                to="/admin/account"
                className="mR2 fs7 fw600">
                Edit account
              </Link>
              <Link
                to="/admin/profile"
                className="mR2 fs7 fw600">
                Edit profile
              </Link>
              <Link
                to={`/user/${profile.id}`}
                className="fs7 fw600">
                View public profile
              </Link>
            </div>
          </div>
        </div>
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
                    <div className="circ mR2 ovfHide">
                      <PlaceholderImage
                        height={60}
                        seed={group.id}
                        width={60}
                      />
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
        {isAccount && <Account />}
        {isEvents && <Events />}
        {isProfile && <Profile />}
        {isMemberships && <Memberships />}
      </div>
    </div>
  );
});
