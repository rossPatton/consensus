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
      <div className="contain flex aiStart mt-4">
        <aside className="c3 bg-white rounded p-2 mr-3">
          <div className="flex flex-col d:flex-row items-center fs4 font-bold pb-3 mb-2 brdB1">
            <div className="mr-3">
              <Avatar
                url={props.session.profile.avatarHash}
                type="user"
              />
            </div>
            <div>
              <div className="text-sm mb-1">You are signed in as <b>user</b>:</div>
              <h1 className="fs4">
                <Link
                  to="/admin/meetings"
                  className="font-bold no-underline">
                  {session.isVerified && (
                    <span
                      aria-label="Verified Account Checkbox"
                      className="dInBl mr-1"
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
                  className="mr-2 text-sm font-bold">
                  Account
                </Link>
                <Link
                  to="/admin/profile"
                  className="mr-2 text-sm font-bold">
                  Profile
                </Link>
              </div>
            </div>
          </div>
          {!orgsByUserIdThunk.isLoading
            && orgsByUserIdThunk.data.length > 0
            && (
              <ul className="mb-2 pb-3" role="navigation">
                <li className="fs4 font-bold mb-2">
                  Your groups
                </li>
                {orgsByUserIdThunk.data.slice(0, 3).map((group, i) => {
                  const roleMap = _.find(props.roles, r => r.orgId === group.id) || {};
                  const {role} = roleMap as tRoleMap;
                  if (role === 'pending') return null;

                  return (
                    <li key={i}>
                      <Link
                        to={`/org/${group.handle}`}
                        className="rounded p-2 flex items-center no-underline hover:bg-gray-1 trans2">
                        <div className="rounded-circ mr-2 ovfHide">
                          <div className="mr-3">
                            <Avatar
                              url={group.avatarHash}
                              type="group"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold mb-2">
                            You are a {role}
                          </div>
                          <h2 className="text-base copyBlack leading-none">
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
                    className="pl-2 text-sm">
                    View all
                  </Link>
                </li>
              </ul>
            )}
          <div className="fs4 font-bold mb-2">
            Other actions
          </div>
          <div className="flex flex-col d:flex-row items-center">
            <form action="/api/v1/download">
              <fieldset>
                <button className="p-2 hover:bg-gray-1 font-bold mr-2">
                  <legend>Download your data</legend>
                </button>
              </fieldset>
            </form>
            <Link
              to="/admin/deleteAccount"
              className="btn p-2 hover:bg-gray-1 font-bold no-underline">
              Delete your account
            </Link>
          </div>
        </aside>
        <div className="">
          {/* user is new. ie, they havent put in a username yet */}
          {!session.profile.username
            && (
              <div className="p-2 rounded mb-2 brdA1 brdW2 bsDashed font-bold black">
                Welcome to Consensus. You&apos;ll need to pick a username before you can join groups or RSVP to meetings. You can change it at anytime. {(isProfile && !subsection) && 'Click "Edit Profile" below to get started'} {!isProfile && <>Click <Link to="/admin/profile/edit">here</Link> to get started.</>}
              </div>
            )}
          <div className="bg-white rounded p-2">
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
