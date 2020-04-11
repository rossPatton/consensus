import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {Aside} from './_components';
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

  const isAccount = section === 'account';
  const isDeleteAccount = section === 'deleteAccount';
  const isMeetings = section === 'meetings';
  const isProfile = section === 'profile';
  const isMemberships = section === 'memberships';

  return (
    <>
      <div className="flex flex-col d:flex-row items-start">
        {props.isMobile && (
          <div className="w-full text-center font-bold mb-2">
            {isAccount && (
              <span className="mr-2 text-gray-5">
              Account
              </span>
            )}
            {!isAccount && (
              <Link
                to="/admin/account"
                className="mr-2">
                Account
              </Link>
            )}
            {isProfile && (
              <span className="mr-2 text-gray-5">
                Profile
              </span>
            )}
            {!isProfile && (
              <Link
                className="mr-2"
                to="/admin/profile">
                Profile
              </Link>
            )}
            {isMeetings && (
              <span className="mr-2 text-gray-5">
                RSVPs
              </span>
            )}
            {!isMeetings && (
              <Link
                className="mr-2"
                to="/admin/meetings">
                RSVPs
              </Link>
            )}
            {isMemberships && (
              <span className="text-gray-5">
                Groups
              </span>
            )}
            {!isMemberships && (
              <Link to="/admin/memberships">
                Groups
              </Link>
            )}
          </div>
        )}
        <Aside
          isDesktop={props.isDesktop}
          isMobile={props.isMobile}
          orgsByUserIdThunk={props.orgsByUserIdThunk}
          roles={props.roles}
          session={props.session}
        />
        <div className="order-1 d:order-2 min-w-full d:min-w-2/3 mb-2 d:mb-0">
          {/* user is new. ie, they havent put in a username yet */}
          {!props.session.profile.username
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
