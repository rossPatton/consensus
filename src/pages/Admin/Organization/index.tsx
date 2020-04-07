import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

import {Avatar} from '../../../components';
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
  const {match, session} = props;
  const {section} = match.params;
  const isAccount = section === 'account';
  const isDelete = section === 'deleteGroup';
  const isMeetings = section === 'meetings';
  const isProfile = section === 'profile';
  const isMembers = section === 'memberships';
  const isMeetingForm = section === 'planMeeting';

  if (!session.isAuthenticated) return <Redirect to="" />;

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
      {(!session.profile.emails || session.profile.emails.length === 0) && (
        <div className="bg-yellow-2 w-full p-2 mb-2 text-center font-bold text-sm">
          Welcome to Consensus! Your group will not be listed and some functionality will be unavailable until you link an email to this account and verify it. Click <Link to="/account/edit">here</Link> to add your email.
        </div>
      )}
      <div className="flex aiStart">
        <aside className="c3 bg-white rounded p-2 mr-3">
          <div className="flex flex-col d:flex-row items-center font-bold pb-3 mb-2 brdB1">
            <div className="mr-3">
              <Avatar
                hash={session.profile.avatarHash}
                type="group"
              />
            </div>
            <div className="leading-none">
              <div className="text-sm mb-1">You are signed in as the <b>admin</b> for:</div>
              <h1 className="fs4">
                <Link
                  className="no-underline"
                  to="/admin/meetings">
                  {session.isVerified && (
                    <span
                      aria-label="Verified Account Checkbox"
                      className="inline-block mr-1"
                      role="img">
                      ✅
                    </span>
                  )}
                  {props.session.profile.name}
                </Link>
              </h1>
              <div>
                <Link
                  to="/admin/account"
                  className="mr-2 text-sm">
                  Account
                </Link>
                <Link
                  to="/admin/profile"
                  className="mr-2 text-sm">
                  Profile
                </Link>
              </div>
            </div>
          </div>
          <ul role="navigation">
            <li className="fs4 font-bold mb-2">
              Admin Actions
            </li>
            <li className="flex flex-col d:flex-row items-center text-base p-2 mb-1 rounded hover:bg-gray-1">
              <div className="bgtext-gray-4 rounded-circ mr-3 p-2" />
              {isMeetings && 'Edit Meetings & Drafts'}
              {!isMeetings && (
                <Link
                  to="/admin/meetings"
                  className={cx({
                    curDisable: !props.session.isVerified,
                  })}>
                  Edit Meetings & Drafts
                </Link>
              )}
            </li>
            <li className="flex flex-col d:flex-row items-center text-base p-2 mb-1 rounded hover:bg-gray-1">
              <div className="bgtext-gray-4 rounded-circ mr-3 p-2" />
              {section === 'memberships' && 'Manage Members & Approvals'}
              {section !== 'memberships' && (
                <Link
                  to="/admin/memberships"
                  className={cx({
                    curDisable: !props.session.isVerified,
                  })}>
                  Manage Members & Approvals
                </Link>
              )}
            </li>
            <li className="flex flex-col d:flex-row items-center text-base p-2 mb-2 rounded hover:bg-gray-1">
              <div className="bgtext-gray-4 rounded-circ mr-3 p-2" />
              {isMeetingForm && 'Plan Meeting'}
              {!isMeetingForm && (
                <Link
                  to="/admin/planMeeting"
                  className={cx({
                    curDisable: !props.session.isVerified,
                  })}>
                  Plan Meeting
                </Link>
              )}
            </li>
          </ul>
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
              to="/admin/deleteGroup"
              className="btn p-2 hover:bg-gray-1 font-bold no-underline">
              {session.deletionDeadline
                ? 'Cancel group deletion'
                : 'Delete your Group'}
            </Link>
          </div>
        </aside>
        <div className="">
          {isAccount && <Account match={props.match} />}
          {isDelete && <DeleteGroup />}
          {isMeetings && <Meetings match={props.match} />}
          {isProfile && <Profile match={props.match} />}
          {isMembers && <Members match={props.match} />}
          {isMeetingForm && (
            <PlanMeeting
              org={props.session.profile as tGroup}
              router={props.location}
            />
          )}
        </div>
      </div>
    </>
  );
});

const mapStateToProps = (store: {session: tThunk<tSession<tGroup>>}) => ({
  session: store.session.data,
});

export const GroupAdmin = connect(mapStateToProps, null)(GroupAdminContainer);
