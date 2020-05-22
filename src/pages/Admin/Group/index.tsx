import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo, useContext} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {MediaContext} from '~app/context';

import {Aside} from './_components';
import {
  Account,
  DeleteGroup,
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
  const isAccount = section === 'account';
  const isDelete = section === 'deleteGroup';
  const isMeetings = section === 'meetings';
  const isProfile = section === 'profile';
  const isMembers = section === 'memberships';
  const isMeetingForm = section === 'planMeeting';

  return (
    <>
      {session.deletionDeadline && (
        <div
          className={cx({
            'w-full p-2 text-center bg-yellow-1 font-bold text-sm': true,
            'mb-2': session.isVerified,
          })}>
          Your group will be deleted on {dayJS(session.deletionDeadline).format('MMM DD')}
        </div>
      )}
      {!session.isVerified && (
        <div className="bg-yellow-2 rounded p-2 mb-3 text-center font-bold text-sm">
          Your group will not be listed and some features will be locked until you verify your email. Click <Link to="/verify-email">here</Link> to verify your email.
        </div>
      )}
      <div className="flex flex-col d:flex-row items-start">
        <Aside
          isDesktop={isDesktop}
          isMobile={isMobile}
          session={session}
          isMeetings={isMeetings}
          isMeetingForm={isMeetingForm}
          isMembers={isMembers}
        />
        <div className="order-1 d:order-2 d:w-2/3 mb-2 d:mb-0">
          {isAccount && <Account match={match} />}
          {isDelete && <DeleteGroup />}
          {isMeetings && <Meetings match={match} />}
          {isProfile && <Profile match={match} />}
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
