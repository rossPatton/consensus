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
            'w-full p-3 text-center bgYellowLite text-bold text-sm': true,
            'mb-3': session.isVerified,
          })}>
          Your group will be deleted on {dayJS(session.deletionDeadline).format('MMM DD')}
        </div>
      )}
      {(!session.profile.emails || session.profile.emails.length === 0) && (
        <div className="bgYellow w-full p-3 mb-3 text-center text-bold text-sm">
          Welcome to Consensus! Your group will not be listed and some functionality will be unavailable until you link an email to this account and verify it. Click <Link to="/account/edit">here</Link> to add your email.
        </div>
      )}
      <div className="contain mt-4 flex aiStart">
        <aside className="c3 bg-white br8 p-3 mr-3">
          <div className="flex flex-col d:flex-row items-center text-bold pb-3 mb-3 brdB1">
            <div className="mr-3">
              <Avatar
                url={session.profile.avatarHash}
                type="group"
              />
            </div>
            <div className="leading-none">
              <div className="fs7 mb-1">You are signed in as the <b>admin</b> for:</div>
              <h1 className="fs4">
                <Link
                  className="no-underline"
                  to="/admin/meetings">
                  {session.isVerified && (
                    <span
                      aria-label="Verified Account Checkbox"
                      className="dInBl mr-1"
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
                  className="mr-2 fs7">
                  Account
                </Link>
                <Link
                  to="/admin/profile"
                  className="mr-2 fs7">
                  Profile
                </Link>
              </div>
            </div>
          </div>
          <ul role="navigation">
            <li className="fs4 text-bold mb-2">
              Admin Actions
            </li>
            <li className="flex flex-col d:flex-row items-center fs5 p-2 mb-1 br4 hover:bg-gray-11">
              <div className="bgGrey3 circ mr-3 p-3" />
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
            <li className="flex flex-col d:flex-row items-center fs5 p-2 mb-1 br4 hover:bg-gray-11">
              <div className="bgGrey3 circ mr-3 p-3" />
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
            <li className="flex flex-col d:flex-row items-center fs5 p-2 mb-3 br4 hover:bg-gray-11">
              <div className="bgGrey3 circ mr-3 p-3" />
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
          <div className="fs4 text-bold mb-3">
            Other actions
          </div>
          <div className="flex flex-col d:flex-row items-center">
            <form action="/api/v1/download">
              <fieldset>
                <button className="p-3 hover:bg-gray-11 text-bold mr-2">
                  <legend>Download your data</legend>
                </button>
              </fieldset>
            </form>
            <Link
              to="/admin/deleteGroup"
              className="btn p-3 hover:bg-gray-11 text-bold no-underline">
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
