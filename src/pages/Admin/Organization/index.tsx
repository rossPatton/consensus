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
      {!session.isVerified && (
        <div className="bg-yellow-2 rounded p-2 mb-3 text-center font-bold text-sm">
          Welcome to Consensus! Your group will not be listed and some functionality will be unavailable until you link an email to this account and verify it. Click <Link to="/admin/account/edit">here</Link> to add or verify your email.
        </div>
      )}
      <div className="flex flex-col d:flex-row items-start">
        <aside className="min-w-full d:min-w-1/3 bg-white rounded p-2 d:mr-2 mb-2 d:mb-0">
          <div className="d:flex-row d:text-left flex flex-col items-center mb-2 text-center">
            <Avatar
              hash={session.profile.avatarHash}
              size="60"
              type="group"
            />
            <div>
              <h1 className="text-3">
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
                  className="mr-1 text-sm">
                  Account
                </Link>
                <Link
                  to="/admin/profile"
                  className="text-sm">
                  Profile
                </Link>
              </div>
            </div>
          </div>
          <ul className="mb-2" role="navigation">
            <li className="font-bold">
              Admin Actions
            </li>
            <li className="flex items-center text-base p-1 mb-1 rounded hover:bg-gray-2">
              <div className="bg-white border rounded-circ mr-2 p-2" />
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
            <li className="flex items-center text-base p-1 mb-1 rounded hover:bg-gray-2">
              <div className="bg-white border rounded-circ mr-2 p-2" />
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
            <li className="flex items-center text-base p-1 rounded hover:bg-gray-2">
              <div className="bg-white border rounded-circ mr-2 p-2" />
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
          <div className="font-bold">
            Other actions
          </div>
          <div className="flex flex-col d:flex-row items-center">
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
              to="/admin/deleteGroup"
              className="btn w-full text-sm p-2 hover:bg-gray-3">
              {session.deletionDeadline
                ? 'Cancel group deletion'
                : 'Delete your Group'}
            </Link>
          </div>
        </aside>
        <div className="min-w-full d:min-w-2/3">
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
