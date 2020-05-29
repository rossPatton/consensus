import React, {memo, useContext} from 'react';
import {Link} from 'react-router-dom';

import {MediaContext} from '~app/context';

import {Aside} from './_components';
import {
  Account,
  DeleteAccount,
  Invitations,
  Meetings,
  Memberships,
  Profile,
  RSVPs,
} from './_subpages';
import {tComponentProps} from './_types';

export const UserAdminComponent = memo((props: tComponentProps) => {
  const {isMobile} = useContext(MediaContext);
  const {params} = props.match;
  const {section, subsection} = params;

  const isAccount = section === 'account';
  const isDeleteAccount = section === 'deleteAccount';
  const isInvite = section === 'invite';
  const isMeetings = section === 'meetings';
  const isRSVPs = section === 'rsvps';
  const isProfile = section === 'profile';
  const isMemberships = section === 'memberships';

  return (
    <>
      <div className="flex flex-col d:flex-row items-start">
        {isMobile && (
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
                Meetings
              </span>
            )}
            {!isMeetings && (
              <Link
                className="mr-2"
                to="/admin/meetings">
                Meetings
              </Link>
            )}
            {isRSVPs && (
              <span className="mr-2 text-gray-5">
                RSVPs
              </span>
            )}
            {!isRSVPs && (
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
          groupsByUserIdThunk={props.groupsByUserIdThunk}
          isInvite={isInvite}
          isRSVPs={isRSVPs}
          roles={props.roles}
          session={props.session}
        />
        <div className="border shadow order-1 d:order-2 w-full d:w-2/3 mb-2 d:mb-0">
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
            {isInvite && <Invitations />}
            {isMeetings && <Meetings />}
            {isRSVPs && <RSVPs />}
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
