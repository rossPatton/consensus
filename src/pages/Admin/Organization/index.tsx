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
  const isEvents = section === 'events';
  const isProfile = section === 'profile';
  const isMembers = section === 'memberships' || section === 'pendingApprovals';
  const isMeetingForm = section === 'planMeeting';

  if (!session.isAuthenticated) return <Redirect to="" />;

  return (
    <div className="contain mT4 fx aiStart">
      <aside className="c3 bgWhite br8 p3 mR3">
        <div className="fx fs4 fw600 pB3 mB3 brdB1">
          <div>
            <img
              alt=""
              className="bgGrey3 circ mR3"
              src="https://s3.amazonaws.com/uifaces/faces/twitter/sta1ex/128.jpg"
              width="70"
            />
          </div>
          <div className="lh1">
            <h1>
              <Link
                to="/admin/events"
                className="fs4 fw600 noUnderline mB2">
                {props.session.profile.name}
              </Link>
            </h1>
            <div>
              <Link
                to="/admin/account"
                className="mR2 fs7 fw600">
                Edit account
              </Link>
              <Link
                to="/admin/profile"
                className="mR2 fs7 fw600">
                Edit profile
              </Link>
              <Link
                to={`/org/${props.session.profile.id}`}
                className="fs7 fw600">
                View Group Page
              </Link>
            </div>
          </div>
        </div>
        <ul role="navigation">
          <li className="fs4 fw600 mB2">
            Admin Actions
          </li>
          <li>
            <Link
              to="/admin/events"
              className="fx aiCtr fs5 p2 mB1 br4 hvrBgGrey1">
              <div className="bgGrey3 circ mR3 p3" />
              Edit Meetings & Drafts
            </Link>
          </li>
          <li>
            <Link
              to="/admin/memberships"
              className="fx aiCtr fs5 p2 mB1 br4 hvrBgGrey1">
              <div className="bgGrey3 circ mR3 p3" />
              Manage Members
            </Link>
          </li>
          <li>
            <Link
              to="/admin/pendingApprovals"
              className="fx aiCtr fs5 p2 mB1 br4 hvrBgGrey1">
              <div className="bgGrey3 circ mR3 p3" />
              Approve Pending Members
            </Link>
          </li>
          {session.profile.type === 'private' && (
            <li>
              <Link
                to="/admin/pendingApprovals"
                className="fx aiCtr fs5 p2 mB1 br4 hvrBgGrey1">
                <div className="bgGrey3 circ mR3 p3" />
              Approve Pending Members
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/admin/planMeeting"
              className="fx aiCtr fs5 p2 mB1 br4 hvrBgGrey1">
              <div className="bgGrey3 circ mR3 p3" />
              Plan Meeting
            </Link>
          </li>
        </ul>
      </aside>
      <div className="bgWhite br8 col p3">
        {isAccount && <Account />}
        {isEvents && <Meetings match={props.match} />}
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

export const GroupAdmin = connect(
  mapStateToProps,
  null,
)(GroupAdminContainer);
