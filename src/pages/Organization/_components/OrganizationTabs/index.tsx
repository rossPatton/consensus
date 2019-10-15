import React, {memo} from 'react';

import {Tab} from './_components';
import {tProps} from './_types';

export const OrganizationTabs = memo((props: tProps) => (
  <nav className="bxSh1 fs5 fw600 bgGrey1">
    <ul className="contain fx aiCtr taCtr ovfScr brdL1">
      <li className="brdR1">
        <Tab
          match={props.match}
          subRoute="overview"
        />
      </li>
      <li className="brdR1">
        <Tab
          match={props.match}
          subRoute="events"
        />
      </li>
      <li className="brdR1">
        <Tab
          match={props.match}
          role={props.role}
          subRoute="decisions"
        />
      </li>
    </ul>
  </nav>
));
