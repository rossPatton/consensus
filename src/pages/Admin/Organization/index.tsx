import cx from 'classnames';
import dayJS from 'dayjs';
import _ from 'lodash';
import React, {memo} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

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
            'row p3 taCtr bgYellowLite fw600 fs6': true,
            mB3: session.isVerified,
          })}>
          Your group will be deleted on {dayJS(session.deletionDeadline).format('MMM DD')}
        </div>
      )}
      {!session.isVerified && (
        <div className="row p3 mB3 taCtr bgRedLite fw600 fs6">
          <Link to="/verify-account">
            Verify your account
          </Link>
        </div>
      )}
      <div className="contain mT4 fx aiStart">
        <aside className="c3 bgWhite br8 p3 mR3">
          <div className="fx aiCtr fw600 pB3 mB3 brdB1">
            <div>
              <img
                alt=""
                className="bgGrey3 circ mR3"
                src="https://s3.amazonaws.com/uifaces/faces/twitter/sta1ex/128.jpg"
                width="70"
              />
            </div>
            <div className="lh1">
              <h1 className="fs4">
                <Link
                  className="noUnderline"
                  to="/admim/meetings">
                  {session.isVerified && (
                    <span
                      aria-label="Verified Account Checkbox"
                      className="dInBl mR1"
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
                  className="mR2 fs7">
                  Account
                </Link>
                <Link
                  to="/admin/profile"
                  className="mR2 fs7">
                  Profile
                </Link>
              </div>
            </div>
          </div>
          <ul role="navigation">
            <li className="fs4 fw600 mB2">
              Admin Actions
            </li>
            <li className="fx aiCtr fs5 p2 mB1 br4 hvrBgGrey1">
              <div className="bgGrey3 circ mR3 p3" />
              {isMeetings && 'Edit Meetings & Drafts'}
              {!isMeetings && (
                <Link to="/admin/meetings">
                  Edit Meetings & Drafts
                </Link>
              )}
            </li>
            <li className="fx aiCtr fs5 p2 mB1 br4 hvrBgGrey1">
              <div className="bgGrey3 circ mR3 p3" />
              {section === 'memberships' && 'Manage Members & Approvals'}
              {section !== 'memberships' && (
                <Link to="/admin/memberships">
                  Manage Members & Approvals
                </Link>
              )}
            </li>
            <li className="fx aiCtr fs5 p2 mB3 br4 hvrBgGrey1">
              <div className="bgGrey3 circ mR3 p3" />
              {isMeetingForm && 'Plan Meeting'}
              {!isMeetingForm && (
                <Link to="/admin/planMeeting">
                  Plan Meeting
                </Link>
              )}
            </li>
          </ul>
          <div className="fs4 fw600 mB3">
            Other actions
          </div>
          <div className="fx aiCtr">
            <form action="/api/v1/download">
              <fieldset>
                <button className="p3 hvrBgGrey1 fw600 mR2">
                  <legend>Download your data</legend>
                </button>
              </fieldset>
            </form>
            <Link
              to="/admin/deleteGroup"
              className="btn p3 hvrBgGrey1 fw600 noUnderline">
              {session.deletionDeadline
                ? 'Cancel group deletion'
                : 'Delete your Group'}
            </Link>
          </div>
        </aside>
        <div className="col">
          {isAccount && <Account />}
          {isDelete && <DeleteGroup />}
          {isMeetings && <Meetings match={props.match} />}
          {isProfile && <Profile />}
          {isMembers && <Members match={props.match} />}
          {isMeetingForm && (
            <PlanMeeting
              org={props.session.profile as tOrg}
              router={props.location}
            />
          )}
        </div>
      </div>
    </>
  );
});

const mapStateToProps = (store: {session: tThunk<tSession<tOrg>>}) => ({
  session: store.session.data,
});

export const GroupAdmin = connect(mapStateToProps, null)(GroupAdminContainer);
