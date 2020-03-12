import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {PlaceholderImage} from '../../../components';
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
  const isAccount = section === 'account';
  const isDeleteAccount = section === 'deleteAccount';
  const isMeetings = section === 'meetings';
  const isProfile = section === 'profile';
  const isMemberships = section === 'memberships';
  const {session, orgsByUserIdThunk} = props;
  const {profile} = props.session;

  return (
    <>
      {!session.isVerified && (
        <div className="row p3 mB3 taCtr bgRedLite fw600 fs6">
          <Link to="/verify-account">
            Verify your account
          </Link>
        </div>
      )}
      <div className="contain fx aiStart mT4">
        <aside className="c3 bgWhite br8 p3 mR3">
          <div className="fx aiCtr fs4 fw600 pB3 mB3 brdB1">
            <img
              alt=""
              className="bgGrey3 circ mR3"
              src="https://s3.amazonaws.com/uifaces/faces/twitter/sta1ex/128.jpg"
              width="70"
            />
            <div>
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

                  return (
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
                {orgsByUserIdThunk.data.length > 3 && (
                  <li>
                    <Link
                      to="/admin/memberships"
                      className="pL2 fs6 fs600">
                      View all
                    </Link>
                  </li>
                )}
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
        <div className="col bgWhite br8 p3">
          {isAccount && <Account />}
          {isDeleteAccount && <DeleteAccount />}
          {isMeetings && <Meetings />}
          {isProfile && <Profile />}
          {isMemberships && <Memberships />}
        </div>
      </div>
    </>
  );
});
