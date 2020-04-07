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
      <div className="flex flex-col d:flex-row items-start">
        <aside className="min-w-full d:min-w-1/3 bg-white rounded p-2 d:mr-2 mb-2 d:mb-0">
          <div className="flex flex-col d:flex-row items-center d:mb-2">
            <Avatar
              hash={props.session.profile.avatarHash}
              size="60"
              type="user"
            />
            <div>
              <h1 className="text-base">
                <Link
                  to="/admin/meetings"
                  className="no-underline">
                  {session.isVerified && (
                    <span
                      aria-label="Verified Account Checkbox"
                      className="inline-block mr-1"
                      role="img">
                      ✅
                    </span>
                  )}
                  @{profile.username}
                </Link>
              </h1>
              <div className="hidden d:block text-sm text-gray-5">
                <Link
                  to="/admin/account"
                  className="mr-1">
                  Account
                </Link>
                <Link to="/admin/profile">
                  Profile
                </Link>
              </div>
            </div>
          </div>
          {!orgsByUserIdThunk.isLoading
            && orgsByUserIdThunk.data.length > 0
            && (
              <ul className="hidden d:block mb-3" role="navigation">
                <li className="mb-1">
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
                        className="rounded p-1 flex items-center no-underline hover:bg-gray-2 transition duration-150">
                        <Avatar
                          hash={group.avatarHash}
                          size="40"
                          type="group"
                        />
                        <div>
                          <div className="text-sm">
                            You are a {role}
                          </div>
                          <h2 className="text-base text-gray-5 leading-none">
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
                    className="pl-1 text-sm">
                    View all
                  </Link>
                </li>
              </ul>
            )}
          <div className="hidden d:block mb-1">
            Other actions
          </div>
          <div className="hidden d:flex d:flex-row items-center">
            <form
              className="w-full mb-1 d:mb-0 d:mr-1"
              action="/api/v1/download">
              <fieldset>
                <button className="w-full text-sm p-2 hover:bg-gray-3">
                  <legend className="w-full">
                    Download your data
                  </legend>
                </button>
              </fieldset>
            </form>
            <Link
              to="/admin/deleteAccount"
              className="btn w-full text-sm p-2 hover:bg-gray-3">
              Delete your account
            </Link>
          </div>
        </aside>
        <div className="min-w-full d:min-w-2/3">
          {/* user is new. ie, they havent put in a username yet */}
          {!session.profile.username
            && (
              <div className="p-2 mb-2 rounded border border-w-2 border-dashed w-full">
                Welcome to Consensus. You&apos;ll need to pick a username before you can join groups or RSVP to meetings. You can change it at anytime. {(isProfile && !subsection) && 'Click "Edit Profile" below to get started'} {!isProfile && <>Click <Link to="/admin/profile/edit">here</Link> to get started.</>}
              </div>
            )}
          <div className="bg-white rounded p-2 w-full">
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
