import _ from 'lodash';
import React, {memo} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

import {Account, Meetings, Members, PlanMeeting, Profile} from './_subpages';
import {tProps} from './_types';

const GroupAdminContainer = memo((props: tProps) => {
  const {match, session} = props;
  const {section} = match.params;
  const isAccount = section === 'account';
  const isMeetings = section === 'events';
  const isProfile = section === 'profile';
  const isMembers = section === 'memberships' || section === 'pendingApprovals';
  const isMeetingForm = section === 'planMeeting';

  if (!session.isAuthenticated) return <Redirect to="" />;

  return (
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
            {props.session.isVerified && (
              <div className="fx aiCtr mB1 fs7">
                <span className="mR1">✔</span>
                Verified Account
              </div>
            )}
            {!props.session.isVerified && (
              <div className="fx aiCtr mB1 fs7">
                <span
                  role="img"
                  aria-label="Big X Emoji">
                  ✖️
                </span>
                Account is not yet verified
              </div>
            )}
            <h1 className="fs4">
              <Link
                className="noUnderline"
                to={`/org/${props.session.profile.id}`}>
                {props.session.profile.name}
              </Link>
            </h1>
            <div>
              <Link
                to="/admin/account"
                className="mR2 fs7">
                Edit account
              </Link>
              <Link
                to="/admin/profile"
                className="mR2 fs7">
                Edit profile
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
              <Link to="/admin/events">
                Edit Meetings & Drafts
              </Link>
            )}
          </li>
          <li className="fx aiCtr fs5 p2 mB1 br4 hvrBgGrey1">
            <div className="bgGrey3 circ mR3 p3" />
            {section === 'memberships' && 'Manage Members'}
            {section !== 'memberships' && (
              <Link to="/admin/memberships">
                Manage Members
              </Link>
            )}
          </li>
          {session.profile.type === 'private' && (
            <li className="fx aiCtr fs5 p2 mB1 br4 hvrBgGrey1">
              <div className="bgGrey3 circ mR3 p3" />
              {section === 'pendingApprovals' && 'Approve Pending Members'}
              {section !== 'pendingApprovals' && (
                <Link to="/admin/pendingApprovals">
                  Approve Pending Members
                </Link>
              )}
            </li>
          )}
          <li className="fx aiCtr fs5 p2 mB1 br4 hvrBgGrey1">
            <div className="bgGrey3 circ mR3 p3" />
            {isMeetingForm && 'Plan Meeting'}
            {!isMeetingForm && (
              <Link to="/admin/planMeeting">
                Plan Meeting
              </Link>
            )}
          </li>
        </ul>
      </aside>
      <div className="bgWhite br8 col p3">
        {isAccount && <Account />}
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
  );
});

const mapStateToProps = (store: {session: tThunk<tSession<tOrg>>}) => ({
  session: store.session.data,
});

export const GroupAdmin = connect(mapStateToProps, null)(GroupAdminContainer);
