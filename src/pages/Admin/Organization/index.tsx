import _ from 'lodash';
import React, {memo} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// import {PlaceholderImage} from '../../../components';
import {Account, Events, Members, Profile} from './_subpages';
import {tProps} from './_types';

const GroupAdminContainer = memo((props: tProps) => {
  const {section} = props.match.params;
  const isAccount = section === 'account';
  const isEvents = section === 'events';
  const isProfile = section === 'profile';
  const isMembers = section === 'memberships';

  return (
    <div className="contain mT4 fx">
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
      </aside>
      {/* <aside className="bgWhite br8 p3 mR5">
        <h1>{props.session.profile.name}</h1>
        <ul>
          <li className="p1">
            {!isAccount && (
              <Link to="/admin/account">
                Account
              </Link>
            )}
            {isAccount && 'Account'}
          </li>
          <li className="p1">
            {isEvents && 'Events'}
            {!isEvents && (
              <Link to="/admin/events">
                Events
              </Link>
            )}
          </li>
          <li className="p1">
            {isProfile && 'Profile'}
            {!isProfile && (
              <Link to="/admin/profile">
                Profile
              </Link>
            )}
          </li>
          <li className="p1">
            {isMembers && 'Members'}
            {!isMembers && (
              <Link to="/admin/memberships">
                Members
              </Link>
            )}
          </li>
        </ul>
      </aside> */}
      <div className="bgWhite br8 col p3">
        {isAccount && <Account />}
        {isEvents && <Events match={props.match} />}
        {isProfile && <Profile />}
        {isMembers && <Members match={props.match} />}
      </div>
    </div>
  );
});

const mapStateToProps = (store: {session: tThunk<tSession>}) => ({
  session: store.session.data,
});

export const GroupAdmin = connect(
  mapStateToProps,
  null,
)(GroupAdminContainer);
