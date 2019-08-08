import React, { memo } from 'react';
import { Tab } from './_components/Tab';

export const OrganizationTabs = memo((props: any) => (
  <nav className="bxSh1 fs5 fw600 bgGrey1">
    <ul className="contain fx aiCtr jcCtr taCtr ovfScr brdL1">
      <li className="col brdR1">
        <Tab
          match={props.match}
          subRoute="overview"
        />
      </li>
      <li className="col brdR1">
        <Tab
          match={props.match}
          subRoute="events"
        />
      </li>
      <li className="col brdR1">
        <Tab
          match={props.match}
          subRoute="decisions"
        />
      </li>
    </ul>
  </nav>
));
