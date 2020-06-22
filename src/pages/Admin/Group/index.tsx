import _ from 'lodash';
import React, {memo, useContext} from 'react';
import {connect} from 'react-redux';

import {MediaContext} from '~app/context';

import {Aside} from './_components';
import {
  DeleteGroup,
  InviteMember,
  Meetings,
  Members,
  PlanMeeting,
  Profile,
} from './_subpages';
import {tProps} from './_types';

const GroupAdminContainer = memo((props: tProps) => {
  const {isDesktop, isMobile} = useContext(MediaContext);
  const {match, session} = props;
  const {section} = match.params;
  const isDelete = section === 'deleteGroup';
  const isInvite = section === 'invite';
  const isMeetings = section === 'meetings';
  const isProfile = section === 'profile';
  const isMembers = section === 'memberships';
  const isMeetingForm = section === 'planMeeting';

  return (
    <>
      {/* {session.deletionDeadline && (
        <div
          className={cx({
            'w-full p-2 text-center bg-yellow-1 font-bold text-sm': true,
          })}>
          Your group will be deleted on {dayJS(session.deletionDeadline).format('MMM DD')}
        </div>
      )} */}
      <div className="flex flex-col d:flex-row items-start">
        <Aside
          isDesktop={isDesktop}
          isInvite={isInvite}
          isMobile={isMobile}
          session={session}
          isMeetings={isMeetings}
          isMeetingForm={isMeetingForm}
          isMembers={isMembers}
        />
        <div className="order-1 d:order-2 w-full d:w-2/3 mb-2 d:mb-0">
          {isDelete && <DeleteGroup />}
          {isInvite && <InviteMember />}
          {isMeetings && <Meetings match={match} />}
          {isProfile && (
            <Profile
              history={props.history}
              match={match}
            />
          )}
          {isMembers && (
            <Members
              group={session.profile as ts.group}
              match={match}
            />
          )}
          {isMeetingForm && (
            <PlanMeeting
              group={session.profile as ts.group}
              router={props.location}
            />
          )}
        </div>
      </div>
    </>
  );
});

const mapStateToProps = (store: {session: ts.thunk<ts.session<ts.group>>}) => ({
  session: store.session.data,
});

export const GroupAdmin = connect(mapStateToProps, null)(GroupAdminContainer);
