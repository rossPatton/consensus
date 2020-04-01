import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Avatar} from '../../../components';
import {
  Account,
  DeleteAccount,
  Meetings,
  Memberships,
  Profile,
} from './_subpages';
import {tComponentProps} from './_types';

export const UserAdminComponent = memo((props: tComponentProps) => {
  const section: string = _.get(props, 'match.params.section', '');
  const subsection: string = _.get(props, 'match.params.subsection', '');
  const {session, orgsByUserIdThunk} = props;
  const {profile} = props.session;

  const isAccount = section === 'account';
  const isDeleteAccount = section === 'deleteAccount';
  const isMeetings = section === 'meetings';
  const isProfile = section === 'profile';
  const isMemberships = section === 'memberships';

  return (
    <>
      <div className="contain fx aiStart mT4">
        <aside className="c3 bgWhite br8 p3 mR3">
          <div className="fx aiCtr fs4 fw600 pB3 mB3 brdB1">
            <Avatar
              url={props.session.profile.avatarHash}
              type="user"
            />
            <div>
              <div className="fs7 mB1">You are signed in as <b>user</b>:</div>
              <h1 className="fs4">
                <Link
                  to="/admin/meetings"
                  className="fw600 noUnderline">
                  {session.isVerified && (
                    <span
                      aria-label="Verified Account Checkbox"
                      className="dInBl mR1"
                      role="img">
                      ✅
                    </span>
                  )}
                  @{profile.username}
                </Link>
              </h1>
              <div>
                <Link
                  to="/admin/account"
                  className="mR2 fs7 fw600">
                  Account
                </Link>
                <Link
                  to="/admin/profile"
                  className="mR2 fs7 fw600">
                  Profile
                </Link>
              </div>
            </div>
          </div>
          {!orgsByUserIdThunk.isLoading
            && orgsByUserIdThunk.data.length > 0
            && (
              <ul className="mB3 pB3" role="navigation">
                <li className="fs4 fw600 mB3">
                  Your groups
                </li>
                {orgsByUserIdThunk.data.slice(0, 3).map((group, i) => {
                  const roleMap = _.find(props.roles, r => r.orgId === group.id) || {};
                  const {role} = roleMap as tRoleMap;
                  if (role === 'pending') return null;

                  return (
                    <li key={i}>
                      <Link
                        to={`/org/${group.id}`}
                        className="br8 p2 fx aiCtr noUnderline hvrBgGrey1 trans2">
                        <div className="circ mR2 ovfHide">
                          <Avatar
                            url={group.avatarHash}
                            type="group"
                          />
                        </div>
                        <div>
                          <div className="fs7 fw600 mB2">
                            You are a {role}
                          </div>
                          <h2 className="fs5 copyBlack lh1">
                            {group.name}
                          </h2>
                        </div>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    to="/admin/memberships"
                    className="pL2 fs6 fs600">
                    View all
                  </Link>
                </li>
              </ul>
            )}
          <div className="fs4 fw600 mB3">
            Other actions
          </div>
          <div className="fx aiCtr">
            <form action="/api/v1/download">
              <fieldset>
                <button className="p3 hvrBgGrey1 fw600 mR2">
                  <legend>Download your data</legend>
                </button>
              </fieldset>
            </form>
            <Link
              to="/admin/deleteAccount"
              className="btn p3 hvrBgGrey1 fw600 noUnderline">
              Delete your account
            </Link>
          </div>
        </aside>
        <div className="col">
          {/* user is new. ie, they havent put in a username yet */}
          {!session.profile.username
            && (
              <div className="p3 br8 mB3 brdA1 brdW2 bsDashed fw600 black">
                Welcome to Consensus. You&apos;ll need to pick a username before you can join groups or RSVP to meetings. You can change it at anytime. {(isProfile && !subsection) && 'Click "Edit Profile" below to get started'} {!isProfile && <>Click <Link to="/admin/profile/edit">here</Link> to get started.</>}
              </div>
            )}
          <div className="bgWhite br8 p3">
            {isAccount
            && (
              <Account
                history={props.history}
                match={props.match}
              />
            )}
            {isDeleteAccount && <DeleteAccount />}
            {isMeetings && <Meetings />}
            {isProfile
              && (
                <Profile
                  history={props.history}
                  match={props.match}
                />
              )}
            {isMemberships && <Memberships />}
          </div>
        </div>
      </div>
    </>
  );
});
