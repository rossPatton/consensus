import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { tComponentProps } from './_types';

export const OrganizationHeaderComponent = memo((props: tComponentProps) => (
  <header className="bgBlue pT4 pB4 mT5 white">
    <div className="contain">
      <ul className="lsNone fx fxWrap fs5 fw600 mB2 brdB1 brdMagenta brdW2 pB2 mB2">
        <li>
          <Link to="/us" className="white mR1">United States</Link>
        </li>
        <li className="mHide mR1">/</li>
        <li>
          <Link to="/us/ny/nyc" className="white mR1">New York City</Link>
        </li>
        <li className="mHide mR1">/</li>
        <li>
          <Link to="/science-and-tech-activism/us/ny/nyc" className="white">
            {props.org.category}
          </Link>
        </li>
      </ul>
      <h1 className="mB2 white ffEksell">
        {props.org.orgName}
      </h1>
      <ul className="lsNone fx fxWrap aiCtr fs5 fw600">
        <li className="mL1 mR3 fx aiCtr">
          <span className="circ bgWhite p2 dInBl mR2" />
          <a title="CLick to see total member list" href="filler" className="white">
            {props.usersByOrg.userTotal} members
          </a>
        </li>
        <li className="mR3 fx aiCtr">
          <span className="circ bgGreen p2 dInBl mR2" />
          <a title="Click to see list of online members" href="filler" className="white">
            89 online now
          </a>
        </li>
        <li className="fx aiCtr white">
          <span className="fs3 mR1">✔</span>
          You are a member of this group
        </li>
      </ul>
    </div>
  </header>
));
