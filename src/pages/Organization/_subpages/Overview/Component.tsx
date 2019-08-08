import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Decisions, Events } from '../../../../components';
import { tComponentProps } from './_types';

export const OverviewComponent = memo((props: tComponentProps) => (
  <>
    <div className="bgYellowLite fs6 fw600 lh1 pT3 pB3 mB4 brdB1">
      <ul className="contain fx fxWrap aiCtr">
        <li className="fx aiCtr cap">
          {props.role && <span className="fs3 mR1">✔</span>}
          {props.role && props.role}
          {!props.role && (
            <Link to="filler" className="bgBlack white br16 p1 pL2 pR2 mR2 noUnderline">
              Join This Organization
            </Link>
          )}
        </li>
        <li className="mR2 fx aiCtr">
          <span className="circ bgBlack p1 dInBl mR1" />
          <a title="Click to see list of online members" href="filler">
            89 members online now
          </a>
        </li>
        <li className="mL1 mR2">
          <a title="CLick to see total member list" href="filler">
            {props.usersByOrg.userTotal} members total
          </a>
        </li>
      </ul>
    </div>
    <div className="contain ffLab pB4">
      <div className="mB4">
        <h2 className="mB2">Mission Statement</h2>
        <p>{props.org.description}</p>
      </div>
      <div className="mB4">
        <h2 className="mB2">Upcoming Events</h2>
        <Events events={props.events} />
        <Link to="/events" className="fs6 fw600 mB3">
          See All Events
        </Link>
      </div>
      <div className="mB4">
        <h2 className="mB2">Public Decisions</h2>
        <Decisions decisions={props.decisions.slice(0, 3)} />
        <Link to="/decisions" className="fs6 fw600">
          See All Decisions
        </Link>
      </div>
    </div>
  </>
));
