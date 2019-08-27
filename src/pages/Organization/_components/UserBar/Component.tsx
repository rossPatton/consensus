import cx from 'classnames';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { tProps } from './_types';

// UserBar currently has 3 states =>
// 1. Not logged in or non-member state, where it just shows public info
// 2. Logged-in state, where members have access to some additional features
// 3. Admin state. Can create new events, or other things not available to members
export const UserBarComponent = memo((props: tProps) => (
  <>
    <div
      className={cx('fs6 lh1 pT3 pB3 mB4 brdB1', {
        bgYellowLite: !props.role,
        bgGreenLite: props.role === 'member',
        bgBlueLite: props.role === 'admin',
      })}>
      <ul className="contain fx fxWrap aiCtr">
        <li className="fx aiCtr cap">
          {props.role && (
            <span className="bgWhite brdA1 br8 p1 pL2 pR2 mR2 fx aiCtr">
              <span className="fs4 mR1">✔</span>
              <span className="ttCap">{props.role}</span>
            </span>
          )}
          {!props.role && (
            <Link
              to="filler"
              className="bgWhite brdA1 br8 p1 pL2 pR2 mR2 noUnderline fw600">
              Join This Organization
            </Link>
          )}
        </li>
        <li className="mR2 fx aiCtr">
          <a title="Click to see list of online members" href="filler">
            89 members online now
          </a>
        </li>
        <li className="mL1 mR2">
          <a title="CLick to see total member list" href="filler">
            {props.usersByOrg.userTotal} members total
          </a>
        </li>
        {props.role === 'admin' && (
          <ul className="fx col jcEnd fs6">
            <li className="mR2 brdA1 p1 br4 bgWhite pL2 pR2 trans1">
              <Link to="createEvent">
                Create Event
              </Link>
            </li>
            <li className="brdA1 p1 br4 bgWhite pL2 pR2 mR2">
              Make a Decision
            </li>
            <li className="brdA1 p1 br4 bgWhite pL2 pR2">
              Manage Group
            </li>
          </ul>
        )}
      </ul>
    </div>
  </>
));
