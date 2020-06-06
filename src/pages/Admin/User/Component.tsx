import React, {memo, useContext} from 'react';
import {Link} from 'react-router-dom';

import {MediaContext} from '~app/context';

import {Aside} from './_components';
import {
  DeleteAccount,
  Invitations,
  Meetings,
  Memberships,
  Profile,
  RSVPs,
  // Security,
} from './_subpages';
import {tComponentProps} from './_types';

export const UserAdminComponent = memo((props: tComponentProps) => {
  const {isMobile} = useContext(MediaContext);
  const {params} = props.match;
  const {section} = params;

  const isDeleteAccount = section === 'deleteAccount';
  const isInvite = section === 'invite';
  const isMeetings = section === 'meetings';
  const isRSVPs = section === 'rsvps';
  const isProfile = section === 'profile';
  const isMemberships = section === 'memberships';
  // const isSecurity = section === 'security';

  return (
    <>
      <div className="flex flex-col d:flex-row items-start">
        {isMobile && (
          <div className="w-full text-center font-bold mb-2">
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
          <div className="bg-white rounded p-2 w-full">
            {isDeleteAccount && <DeleteAccount />}
            {isInvite && <Invitations />}
            {isMeetings && <Meetings />}
            {isRSVPs && <RSVPs />}
            {/* {isSecurity && <Security />} */}
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
